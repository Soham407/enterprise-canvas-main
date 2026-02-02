"use client";

import { ShieldCheck, Users, ClipboardList, Map, AlertCircle, TrendingUp, CheckCircle2, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SecuritySupervisorDashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold ">Security Operations Control</h1>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Site supervision, patrol verification, and staff compliance.</p>
        </div>
        <div className="flex gap-2">
           <Button className="gap-2 font-bold shadow-lg shadow-primary/20 bg-primary">
               <ShieldCheck className="h-4 w-4" /> Personnel Audit
           </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
          {[
              { label: "Guards on Site", value: "32", sub: "3 Open Posts", icon: Users, color: "text-primary" },
              { label: "Checkpoint Compliance", value: "96.5%", sub: "Last 4 hours", icon: Map, color: "text-success" },
              { label: "Pending Checklists", value: "4", sub: "Awaiting review", icon: ClipboardList, color: "text-warning" },
              { label: "Unresolved Alerts", value: "2", sub: "Site B & Site D", icon: AlertCircle, color: "text-critical" },
          ].map((stat, i) => (
              <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
                  <div className="flex items-center gap-4 text-left">
                      <div className={cn("h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center", stat.color)}>
                          <stat.icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                          <span className="text-xl font-bold">{stat.value}</span>
                          <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">{stat.label}</span>
                      </div>
                  </div>
              </Card>
          ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-none shadow-card ring-1 ring-border">
              <CardHeader className="bg-muted/5 border-b">
                  <CardTitle className="text-sm font-bold uppercase ">Site Patrol Log Real-time</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                  <div className="divide-y text-left">
                      {[
                          { guard: "Robert Wilson", point: "Checkpoint HQ-01", time: "10:45 AM", status: "Verified" },
                          { guard: "Sam Harris", point: "Parking Lot B", time: "10:30 AM", status: "Verified" },
                          { guard: "Tina Fey", point: "Restricted Room 4", time: "10:15 AM", status: "Inactivity Alert", alert: true },
                          { guard: "Mike Ross", point: "Perimeter Gate 2", time: "10:00 AM", status: "Verified" },
                      ].map((log, i) => (
                          <div key={i} className="p-4 flex items-center justify-between group hover:bg-muted/20">
                              <div className="flex items-center gap-4">
                                  <div className={cn("h-8 w-8 rounded-full flex items-center justify-center font-bold text-[10px]", log.alert ? "bg-critical/10 text-critical animate-pulse" : "bg-primary/5 text-primary")}>
                                      {log.guard.substring(0,2).toUpperCase()}
                                  </div>
                                  <div className="flex flex-col">
                                      <span className="text-sm font-bold ">{log.guard}</span>
                                      <span className="text-[10px] text-muted-foreground font-medium uppercase">{log.point}</span>
                                  </div>
                              </div>
                              <div className="flex items-center gap-4">
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{log.time}</span>
                                  <Badge variant="outline" className={cn("text-[9px] font-bold uppercase", log.alert ? "bg-critical/5 text-critical border-critical/20" : "bg-success/5 text-success border-success/20")}>{log.status}</Badge>
                              </div>
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>

          <Card className="border-none shadow-card ring-1 ring-border">
              <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Staff Attendance Pulse</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                   <div className="flex flex-col items-center gap-4 py-6 border-b border-dashed">
                       <div className="h-20 w-20 rounded-full border-4 border-success border-t-transparent flex items-center justify-center animate-spin-slow">
                           <span className="text-lg font-bold text-success">92%</span>
                       </div>
                       <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Attendance for Morning Shift</p>
                   </div>
                   <div className="space-y-4 pt-4">
                       <Button variant="outline" className="w-full text-[10px] font-bold uppercase h-10 border-muted-foreground/20">Check Late Comers</Button>
                       <Button variant="ghost" className="w-full text-[10px] font-bold uppercase h-10 text-primary">View Shift Roster</Button>
                   </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
