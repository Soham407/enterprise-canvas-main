"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { MAIN_GATE_CODE, CURRENT_ORG_ID } from "@/src/lib/constants";

interface GateLocation {
  id: string;
  latitude: number;
  longitude: number;
  geo_fence_radius: number;
  location_name: string;
}

interface AttendanceState {
  isWithinRange: boolean;
  distance: number | null;
  isLoading: boolean;
  error: string | null;
  gateLocation: GateLocation | null;
  currentPosition: { latitude: number; longitude: number } | null;
  isClockedIn: boolean;
  todayAttendance: {
    check_in_time: string | null;
    check_out_time: string | null;
  } | null;
}

/**
 * Haversine formula to calculate the great-circle distance between two points
 * Reference: HR-Management-and-Geo-Attendance-System geofencing logic
 * @returns distance in meters
 */
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function useAttendance(employeeId?: string) {
  const [state, setState] = useState<AttendanceState>({
    isWithinRange: false,
    distance: null,
    isLoading: true,
    error: null,
    gateLocation: null,
    currentPosition: null,
    isClockedIn: false,
    todayAttendance: null,
  });

  const watchIdRef = useRef<number | null>(null);
  const gpsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch gate location from company_locations
  const fetchGateLocation = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("company_locations")
        .select("id, latitude, longitude, geo_fence_radius, location_name")
        .eq("location_code", MAIN_GATE_CODE)
        .single();

      if (error) throw error;

      if (data) {
        setState((prev) => ({
          ...prev,
          gateLocation: {
            id: data.id,
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
            geo_fence_radius: Number(data.geo_fence_radius) || 50, // Default 50m
            location_name: data.location_name,
          },
        }));
      }
    } catch (err: any) {
      console.error("Error fetching gate location:", err);
      setState((prev) => ({
        ...prev,
        error: "Failed to fetch gate location",
        isLoading: false,
      }));
    }
  }, []);

  // Fetch today's attendance record
  const fetchTodayAttendance = useCallback(async () => {
    if (!employeeId) return;

    try {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("attendance_logs")
        .select("check_in_time, check_out_time")
        .eq("employee_id", employeeId)
        .eq("log_date", today)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows found
        throw error;
      }

      setState((prev) => ({
        ...prev,
        todayAttendance: data || null,
        isClockedIn: data?.check_in_time && !data?.check_out_time ? true : false,
      }));
    } catch (err: any) {
      console.error("Error fetching attendance:", err);
    }
  }, [employeeId]);

  // Get current browser/device location
  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocation is not supported by this browser",
        isLoading: false,
      }));
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setState((prev) => {
          if (!prev.gateLocation) {
            return {
              ...prev,
              currentPosition: { latitude, longitude },
              isLoading: false,
            };
          }

          const distance = haversineDistance(
            latitude,
            longitude,
            prev.gateLocation.latitude,
            prev.gateLocation.longitude
          );

          const isWithinRange = distance <= prev.gateLocation.geo_fence_radius;

          return {
            ...prev,
            currentPosition: { latitude, longitude },
            distance: Math.round(distance),
            isWithinRange,
            isLoading: false,
            error: null,
          };
        });
      },
      (error) => {
        let errorMessage = "Failed to get your location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable GPS.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
      },
      options
    );
  }, []);

  // Clock In action
  const clockIn = useCallback(async (): Promise<boolean> => {
    if (!employeeId || !state.isWithinRange || !state.gateLocation) {
      return false;
    }

    try {
      const now = new Date();
      const today = now.toISOString().split("T")[0];

      const { error } = await supabase.from("attendance_logs").insert({
        employee_id: employeeId,
        log_date: today,
        check_in_time: now.toISOString(),
        check_in_location_id: state.gateLocation.id,
        status: "present",
      });

      if (error) throw error;

      setState((prev) => ({
        ...prev,
        isClockedIn: true,
        todayAttendance: {
          check_in_time: now.toISOString(),
          check_out_time: null,
        },
      }));

      // Start GPS tracking after clock in
      startGpsTracking();

      return true;
    } catch (err: any) {
      console.error("Error clocking in:", err);
      return false;
    }
  }, [employeeId, state.isWithinRange, state.gateLocation]);

  // Clock Out action
  const clockOut = useCallback(async (): Promise<boolean> => {
    if (!employeeId || !state.gateLocation) {
      return false;
    }

    try {
      const now = new Date();
      const today = now.toISOString().split("T")[0];

      // Calculate total hours worked
      const checkInTime = state.todayAttendance?.check_in_time
        ? new Date(state.todayAttendance.check_in_time)
        : null;
      const totalHours = checkInTime
        ? (now.getTime() - checkInTime.getTime()) / (1000 * 60 * 60)
        : null;

      const { error } = await supabase
        .from("attendance_logs")
        .update({
          check_out_time: now.toISOString(),
          check_out_location_id: state.gateLocation.id,
          total_hours: totalHours ? parseFloat(totalHours.toFixed(2)) : null,
        })
        .eq("employee_id", employeeId)
        .eq("log_date", today);

      if (error) throw error;

      setState((prev) => ({
        ...prev,
        isClockedIn: false,
        todayAttendance: {
          ...prev.todayAttendance,
          check_in_time: prev.todayAttendance?.check_in_time || null,
          check_out_time: now.toISOString(),
        },
      }));

      // Stop GPS tracking after clock out
      stopGpsTracking();

      return true;
    } catch (err: any) {
      console.error("Error clocking out:", err);
      return false;
    }
  }, [employeeId, state.gateLocation, state.todayAttendance]);

  // Start GPS tracking (every 5 minutes)
  const startGpsTracking = useCallback(() => {
    if (gpsIntervalRef.current) return; // Already tracking

    const trackLocation = async () => {
      if (!employeeId || !state.currentPosition) return;

      try {
        await supabase.from("gps_tracking").insert({
          employee_id: employeeId,
          latitude: state.currentPosition.latitude,
          longitude: state.currentPosition.longitude,
          tracked_at: new Date().toISOString(),
          is_mock_location: false,
        });
      } catch (err) {
        console.error("GPS tracking error:", err);
      }
    };

    // Track immediately, then every 5 minutes
    trackLocation();
    gpsIntervalRef.current = setInterval(trackLocation, 5 * 60 * 1000);
  }, [employeeId, state.currentPosition]);

  // Stop GPS tracking
  const stopGpsTracking = useCallback(() => {
    if (gpsIntervalRef.current) {
      clearInterval(gpsIntervalRef.current);
      gpsIntervalRef.current = null;
    }
  }, []);

  // Refresh location data
  const refresh = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    fetchGateLocation();
    fetchTodayAttendance();
    getCurrentPosition();
  }, [fetchGateLocation, fetchTodayAttendance, getCurrentPosition]);

  // Initialize
  useEffect(() => {
    fetchGateLocation();
    fetchTodayAttendance();
  }, [fetchGateLocation, fetchTodayAttendance]);

  // Start watching position after gate location is loaded
  useEffect(() => {
    if (state.gateLocation) {
      getCurrentPosition();
    }
  }, [state.gateLocation, getCurrentPosition]);

  // Start GPS tracking if already clocked in
  useEffect(() => {
    if (state.isClockedIn && state.currentPosition) {
      startGpsTracking();
    }
    return () => {
      stopGpsTracking();
    };
  }, [state.isClockedIn, state.currentPosition, startGpsTracking, stopGpsTracking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      stopGpsTracking();
    };
  }, [stopGpsTracking]);

  return {
    ...state,
    clockIn,
    clockOut,
    refresh,
  };
}
