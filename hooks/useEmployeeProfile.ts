"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/src/lib/supabaseClient";

interface EmployeeProfile {
  employeeId: string | null;
  guardId: string | null;
  guardCode: string | null;
  employeeCode: string | null;
  fullName: string | null;
  role: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to get the employee profile for the authenticated user.
 * This bridges the gap between Supabase auth (auth.users) and the application's
 * employees/security_guards tables.
 * 
 * Usage:
 * const { employeeId, guardId, isLoading, error } = useEmployeeProfile();
 * 
 * Then pass employeeId to useAttendance, usePanicAlert, etc.
 */
export function useEmployeeProfile() {
  const [profile, setProfile] = useState<EmployeeProfile>({
    employeeId: null,
    guardId: null,
    guardCode: null,
    employeeCode: null,
    fullName: null,
    role: null,
    isLoading: true,
    error: null,
  });

  const fetchProfile = useCallback(async () => {
    try {
      // Step 1: Get authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        setProfile((prev) => ({
          ...prev,
          isLoading: false,
          error: "Not authenticated",
        }));
        return;
      }

      // Step 2: Get user record from users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select(`
          id,
          employee_id,
          role_id,
          full_name,
          roles (
            role_name
          )
        `)
        .eq("id", user.id)
        .single();

      if (userError) {
        // User might not have a record in users table yet
        // This can happen for new users
        if (userError.code === "PGRST116") {
          setProfile((prev) => ({
            ...prev,
            isLoading: false,
            error: "User profile not set up. Please contact admin.",
          }));
        } else {
          throw userError;
        }
        return;
      }

      if (!userData.employee_id) {
        setProfile((prev) => ({
          ...prev,
          isLoading: false,
          fullName: userData.full_name,
          role: (userData.roles as { role_name: string } | null)?.role_name || null,
          error: "No employee record linked",
        }));
        return;
      }

      // Step 3: Get employee details
      const { data: employeeData, error: employeeError } = await supabase
        .from("employees")
        .select("id, employee_code, first_name, last_name")
        .eq("id", userData.employee_id)
        .single();

      if (employeeError) throw employeeError;

      // Step 4: Check if employee is a security guard
      const { data: guardData, error: guardError } = await supabase
        .from("security_guards")
        .select("id, guard_code")
        .eq("employee_id", userData.employee_id)
        .single();

      // Handle guard query errors explicitly
      let guardInfo: { id: string; guard_code: string } | null = null;
      if (guardError) {
        if (guardError.code === "PGRST116") {
          // No rows found - user is not a guard, this is okay
          guardInfo = null;
        } else {
          // Unexpected error - propagate it
          throw guardError;
        }
      } else {
        guardInfo = guardData;
      }

      // Safely construct fullName, handling null values
      const firstName = employeeData.first_name || "";
      const lastName = employeeData.last_name || "";
      const fullName = [firstName, lastName].filter(Boolean).join(" ").trim() || null;

      setProfile({
        employeeId: userData.employee_id,
        guardId: guardInfo?.id || null,
        guardCode: guardInfo?.guard_code || null,
        employeeCode: employeeData.employee_code,
        fullName,
        role: (userData.roles as { role_name: string } | null)?.role_name || null,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      console.error("Error fetching employee profile:", err);
      setProfile((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to load profile",
      }));
    }
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    fetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          fetchProfile();
        } else {
          setProfile({
            employeeId: null,
            guardId: null,
            guardCode: null,
            employeeCode: null,
            fullName: null,
            role: null,
            isLoading: false,
            error: "Not authenticated",
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  return {
    ...profile,
    refresh: fetchProfile,
  };
}

// For development/testing: allows falling back to a mock ID when not authenticated
export function useEmployeeProfileWithFallback(mockEmployeeId?: string) {
  const profile = useEmployeeProfile();

  // If loading, return loading state
  if (profile.isLoading) {
    return profile;
  }

  // If authenticated and has employee ID, use it
  if (profile.employeeId) {
    return profile;
  }

  // If we have a mock ID and are in development, use it
  if (mockEmployeeId && process.env.NODE_ENV === "development") {
    return {
      ...profile,
      employeeId: mockEmployeeId,
      isLoading: false,
      error: null,
      _isMock: true, // Flag to indicate mock usage
    };
  }

  return profile;
}
