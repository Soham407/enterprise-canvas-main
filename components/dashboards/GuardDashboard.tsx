"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  MapPin,
  PhoneCall,
  Clock,
  Users,
  LogIn,
  LogOut,
  Loader2,
  AlertTriangle,
  Navigation,
  RefreshCw,
  UserCheck,
  Phone,
  Building,
  Car,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAttendance } from "@/hooks/useAttendance";
import { usePanicAlert } from "@/hooks/usePanicAlert";
import { useGuardVisitors } from "@/hooks/useGuardVisitors";
import { useEmployeeProfileWithFallback } from "@/hooks/useEmployeeProfile";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/src/lib/supabaseClient";

// Fallback for development/testing when not authenticated
const DEV_MOCK_EMPLOYEE_ID = "11111111-1111-1111-1111-111111111111";

// Expected Visitors Section Component
interface ExpectedVisitorsSectionProps {
  gateLocation?: {
    id: string;
    latitude: number;
    longitude: number;
    geo_fence_radius: number;
    location_name: string;
  } | null;
}

function ExpectedVisitorsSection({ gateLocation }: ExpectedVisitorsSectionProps) {
  const { toast } = useToast();
  const {
    expectedVisitors,
    isLoading,
    isCheckingIn,
    checkInVisitor,
    refresh,
  } = useGuardVisitors();

  // Handle visitor check-in
  const handleCheckIn = async (visitorId: string, visitorName: string) => {
    const result = await checkInVisitor(visitorId, undefined, gateLocation?.id);
    
    if (result.success) {
      toast({
        title: "Visitor Checked In",
        description: `${visitorName} has been checked in successfully.`,
      });
    } else {
      toast({
        title: "Check-In Failed",
        description: result.error || "Could not check in visitor.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="border-none shadow-card ring-1 ring-border">
        <CardContent className="p-6 text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
          <p className="text-xs text-muted-foreground mt-2">Loading expected visitors...</p>
        </CardContent>
      </Card>
    );
  }

  if (expectedVisitors.length === 0) {
    return (
      <Card className="border-none shadow-card ring-1 ring-border bg-muted/20">
        <CardContent className="p-6 text-center">
          <UserCheck className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
          <p className="text-sm font-medium text-muted-foreground">No Expected Visitors</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Pre-approved visitors will appear here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-card ring-1 ring-border overflow-hidden">
      <CardHeader className="pb-3 border-b bg-gradient-to-r from-success/5 to-transparent">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-success" />
            Expected Visitors
          </CardTitle>
          <Badge className="bg-success/10 text-success border-success/20 text-[10px]">
            {expectedVisitors.length} PRE-APPROVED
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y max-h-[300px] overflow-y-auto">
          {expectedVisitors.map((visitor) => (
            <div
              key={visitor.id}
              className="p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors"
            >
              {/* Avatar */}
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-success">
                  {visitor.visitor_name.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Visitor Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-sm truncate">{visitor.visitor_name}</p>
                  <Badge
                    variant="outline"
                    className="text-[8px] font-bold uppercase bg-success/10 text-success border-success/20"
                  >
                    PRE-APPROVED
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                  {visitor.flat && (
                    <span className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {visitor.flat.building?.building_name} - {visitor.flat.flat_number}
                    </span>
                  )}
                  {visitor.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {visitor.phone}
                    </span>
                  )}
                  {visitor.vehicle_number && (
                    <span className="flex items-center gap-1">
                      <Car className="h-3 w-3" />
                      {visitor.vehicle_number}
                    </span>
                  )}
                </div>
                {visitor.purpose && (
                  <p className="text-[10px] text-muted-foreground/70 mt-1 truncate">
                    Purpose: {visitor.purpose}
                  </p>
                )}
              </div>

              {/* Check-In Button */}
              <Button
                size="sm"
                className="shrink-0 bg-success hover:bg-success/90 gap-1 h-8 text-xs"
                disabled={isCheckingIn === visitor.id}
                onClick={() => handleCheckIn(visitor.id, visitor.visitor_name)}
              >
                {isCheckingIn === visitor.id ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <LogIn className="h-3 w-3" />
                )}
                Check In
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


export function GuardDashboard() {
  const { toast } = useToast();
  
  // Get authenticated employee profile (falls back to mock in dev)
  const { 
    employeeId, 
    guardCode,
    fullName,
    isLoading: isProfileLoading, 
    error: profileError 
  } = useEmployeeProfileWithFallback(DEV_MOCK_EMPLOYEE_ID);

  const {
    isWithinRange,
    distance,
    isLoading,
    error,
    gateLocation,
    currentPosition,
    isClockedIn,
    todayAttendance,
    clockIn,
    clockOut,
    refresh,
  } = useAttendance(employeeId || undefined);

  const [isClockingIn, setIsClockingIn] = useState(false);
  const [isClockingOut, setIsClockingOut] = useState(false);
  const [visitorStats, setVisitorStats] = useState({
    visitorsToday: 0,
    pendingCheckouts: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Panic Alert Hook
  const {
    isTriggering: isPanicTriggering,
    isHolding: isPanicHolding,
    holdProgress: panicHoldProgress,
    triggerPanic,
    startHold: startPanicHold,
    endHold: endPanicHold,
    cancelHold: cancelPanicHold,
  } = usePanicAlert();

  // Handle panic button hold release
  const handlePanicRelease = async () => {
    if (!employeeId) {
      toast({
        title: "Not Authenticated",
        description: "Please log in to use the panic alert.",
        variant: "destructive",
      });
      return;
    }

    const wasHeldLongEnough = endPanicHold();
    if (wasHeldLongEnough) {
      // Use guard's real-time position if available, fallback to gate location
      const currentLat = currentPosition?.latitude ?? gateLocation?.latitude;
      const currentLng = currentPosition?.longitude ?? gateLocation?.longitude;

      const result = await triggerPanic({
        employeeId: employeeId,
        latitude: currentLat,
        longitude: currentLng,
        locationId: gateLocation?.id,
        alertType: "panic",
      });

      if (result.success) {
        toast({
          title: "🚨 Emergency Alert Sent!",
          description: "Security supervisor has been notified. Help is on the way.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Alert Failed",
          description: result.error || "Could not send emergency alert. Try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Fetch visitor statistics
  useEffect(() => {
    async function fetchVisitorStats() {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Visitors today
        const { count: visitorsToday, error: todayError } = await supabase
          .from("visitors")
          .select("*", { count: "exact", head: true })
          .gte("entry_time", today.toISOString());

        if (todayError) throw todayError;

        // Pending checkouts (visitors who entered but haven't exited)
        const { count: pendingCheckouts, error: pendingError } = await supabase
          .from("visitors")
          .select("*", { count: "exact", head: true })
          .gte("entry_time", today.toISOString())
          .is("exit_time", null);

        if (pendingError) throw pendingError;

        setVisitorStats({
          visitorsToday: visitorsToday || 0,
          pendingCheckouts: pendingCheckouts || 0,
        });
      } catch (err) {
        console.error("Error fetching visitor stats:", err);
      } finally {
        setIsLoadingStats(false);
      }
    }

    fetchVisitorStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchVisitorStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle Clock In
  const handleClockIn = async () => {
    setIsClockingIn(true);
    const result = await clockIn();
    setIsClockingIn(false);

    if (result.success) {
      toast({
        title: "Clocked In Successfully",
        description: `Welcome! Your shift has started at ${new Date().toLocaleTimeString()}`,
      });
    } else {
      toast({
        title: "Clock In Failed",
        description: result.error || "Please ensure you are within the geofenced area.",
        variant: "destructive",
      });
    }
  };

  // Handle Clock Out
  const handleClockOut = async () => {
    setIsClockingOut(true);
    const success = await clockOut();
    setIsClockingOut(false);

    if (success) {
      toast({
        title: "Clocked Out Successfully",
        description: `Your shift has ended at ${new Date().toLocaleTimeString()}`,
      });
    } else {
      toast({
        title: "Clock Out Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Format time for display
  const formatTime = (isoString: string | null) => {
    if (!isoString) return "--:--";
    return new Date(isoString).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pb-20">
      {/* Panic Section */}
      <Card className="border-none bg-critical/10 shadow-lg shadow-critical/20">
        <CardContent className="p-8 text-center flex flex-col items-center gap-4">
          {/* Panic Button with Hold Progress */}
          <div
            className={cn(
              "h-24 w-24 rounded-full bg-critical flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform active:scale-95 relative select-none",
              isPanicHolding && "scale-110",
              isPanicTriggering && "opacity-50 pointer-events-none"
            )}
            onMouseDown={startPanicHold}
            onMouseUp={handlePanicRelease}
            onMouseLeave={cancelPanicHold}
            onTouchStart={startPanicHold}
            onTouchEnd={handlePanicRelease}
          >
            {/* Progress Ring */}
            {isPanicHolding && (
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeDasharray={`${panicHoldProgress * 2.89} 289`}
                  strokeLinecap="round"
                  className="transition-all duration-100"
                />
              </svg>
            )}
            {isPanicTriggering ? (
              <Loader2 className="h-12 w-12 text-white animate-spin" />
            ) : (
              <Shield className="h-12 w-12 text-white fill-white" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-critical uppercase">
              {isPanicHolding
                ? `Hold... ${Math.round(panicHoldProgress)}%`
                : "Emergency Panic"}
            </h2>
            <p className="text-xs text-critical/70 font-bold uppercase tracking-widest mt-1">
              {isPanicTriggering
                ? "Sending Alert..."
                : "Press for 3 Seconds to Alert Manager"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Card */}
      <Card className="border-none shadow-card ring-1 ring-border overflow-hidden">
        <CardHeader className="pb-3 border-b bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold uppercase flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Attendance
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={refresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={cn("h-4 w-4", isLoading && "animate-spin")}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {/* GPS Status */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center",
                  isLoading
                    ? "bg-muted"
                    : isWithinRange
                    ? "bg-success/20"
                    : "bg-warning/20"
                )}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                ) : isWithinRange ? (
                  <MapPin className="h-5 w-5 text-success" />
                ) : (
                  <Navigation className="h-5 w-5 text-warning" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  {isLoading ? "Detecting Location..." : "GPS Status"}
                </p>
                {!isLoading && (
                  <p
                    className={cn(
                      "text-sm font-bold",
                      isWithinRange ? "text-success" : "text-warning"
                    )}
                  >
                    {isWithinRange
                      ? `Within Range (${distance}m)`
                      : `Outside Range (${distance}m away)`}
                  </p>
                )}
                {gateLocation && (
                  <p className="text-[10px] text-muted-foreground">
                    {gateLocation.location_name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-critical/10 text-critical">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <p className="text-xs font-medium">{error}</p>
            </div>
          )}

          {/* Attendance Times */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/20 text-center">
              <p className="text-[10px] font-bold uppercase text-muted-foreground">
                Clocked In
              </p>
              <p className="text-lg font-bold text-success">
                {formatTime(todayAttendance?.check_in_time || null)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/20 text-center">
              <p className="text-[10px] font-bold uppercase text-muted-foreground">
                Clocked Out
              </p>
              <p className="text-lg font-bold text-muted-foreground">
                {formatTime(todayAttendance?.check_out_time || null)}
              </p>
            </div>
          </div>

          {/* Clock In/Out Button */}
          {!isClockedIn ? (
            <Button
              className="w-full h-14 text-base font-bold gap-2 bg-success hover:bg-success/90"
              onClick={handleClockIn}
              disabled={isClockingIn || !isWithinRange || isLoading}
            >
              {isClockingIn ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <LogIn className="h-5 w-5" />
              )}
              {isClockingIn ? "Clocking In..." : "Clock In"}
            </Button>
          ) : (
            <Button
              className="w-full h-14 text-base font-bold gap-2"
              variant="destructive"
              onClick={handleClockOut}
              disabled={isClockingOut}
            >
              {isClockingOut ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <LogOut className="h-5 w-5" />
              )}
              {isClockingOut ? "Clocking Out..." : "Clock Out"}
            </Button>
          )}

          {/* Warning if out of range */}
          {!isWithinRange && !isLoading && !error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-warning/10 text-warning">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p className="text-xs font-medium">
                Move closer to {gateLocation?.location_name || "the gate"} to
                clock in.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-none shadow-card ring-1 ring-border p-4 bg-gradient-to-br from-info/5 to-transparent">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5 text-info" />
              {isLoadingStats && (
                <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
              )}
            </div>
            <div>
              <span className="text-2xl font-bold">
                {visitorStats.visitorsToday}
              </span>
              <p className="text-[10px] font-bold uppercase text-muted-foreground mt-1">
                Visitors Today
              </p>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-card ring-1 ring-border p-4 bg-gradient-to-br from-warning/5 to-transparent">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <AlertCircle className="h-5 w-5 text-warning" />
              {isLoadingStats && (
                <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
              )}
            </div>
            <div>
              <span className="text-2xl font-bold">
                {visitorStats.pendingCheckouts}
              </span>
              <p className="text-[10px] font-bold uppercase text-muted-foreground mt-1">
                Pending Checkouts
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Expected Visitors Section (Pre-Approved by Residents) */}
      <ExpectedVisitorsSection gateLocation={gateLocation} />
      {/* Duty Status */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-none shadow-card ring-1 ring-border p-4 bg-muted/20">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">
              Shift Time
            </span>
            <span className="text-sm font-bold">08:00 - 20:00</span>
            <Badge
              className={cn(
                "w-fit text-[8px] mt-1",
                isClockedIn
                  ? "bg-success/10 text-success border-success/20"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isClockedIn ? "ON DUTY" : "OFF DUTY"}
            </Badge>
          </div>
        </Card>
        <Card className="border-none shadow-card ring-1 ring-border p-4 bg-muted/20">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">
              Location
            </span>
            <span className="text-sm font-bold">
              {gateLocation?.location_name || "Loading..."}
            </span>
            <div
              className={cn(
                "flex items-center gap-1 text-[8px] font-bold uppercase mt-1",
                isWithinRange ? "text-success" : "text-warning"
              )}
            >
              <MapPin className="h-2 w-2" />
              {isWithinRange ? "Geo-Fenced" : "Out of Range"}
            </div>
          </div>
        </Card>
      </div>

      {/* Checklist Hub */}
      <Card className="border-none shadow-card ring-1 ring-border">
        <CardHeader className="pb-3 border-b bg-muted/5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold uppercase flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-primary" />
              Daily Checklist
            </CardTitle>
            <Badge variant="outline" className="text-[10px] font-bold">
              4/6 DONE
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[
              {
                task: "Parking Lights ON/OFF check",
                status: "Done",
                time: "06:15 AM",
              },
              {
                task: "Water Pump Motor Status",
                status: "Done",
                time: "07:30 AM",
              },
              { task: "Secondary Gates Locked", status: "Pending" },
              { task: "Visitor Register Verified", status: "Pending" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 flex items-center justify-between group cursor-pointer hover:bg-muted/30"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                      item.status === "Done"
                        ? "bg-success border-success text-white"
                        : "border-muted"
                    )}
                  >
                    {item.status === "Done" && (
                      <CheckCircle2 className="h-3 w-3" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-xs font-bold",
                        item.status === "Done"
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      )}
                    >
                      {item.task}
                    </span>
                    {item.time && (
                      <span className="text-[9px] text-muted-foreground">
                        {item.time}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="border-none shadow-card ring-1 ring-border">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Quick Dial
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 pb-6">
          <Button
            variant="outline"
            className="h-10 justify-start gap-2 text-xs font-bold border-muted-foreground/20"
          >
            <PhoneCall className="h-3 w-3 text-primary" /> Police
          </Button>
          <Button
            variant="outline"
            className="h-10 justify-start gap-2 text-xs font-bold border-muted-foreground/20"
          >
            <AlertCircle className="h-3 w-3 text-critical" /> Fire
          </Button>
          <Button
            variant="outline"
            className="h-10 justify-start gap-2 text-xs font-bold border-muted-foreground/20"
          >
            <PhoneCall className="h-3 w-3 text-info" /> Ambulance
          </Button>
          <Button
            variant="outline"
            className="h-10 justify-start gap-2 text-xs font-bold border-muted-foreground/20"
          >
            <PhoneCall className="h-3 w-3 text-success" /> Supervisor
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
