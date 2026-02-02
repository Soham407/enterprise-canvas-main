"use client";

import { MessageSquare, Users, ShieldAlert, BarChart3, Clock, ArrowRight, UserMinus, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function SocietyManagerDashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold ">Society Management Hub</h1>
          <p className="text-sm text-muted-foreground font-medium">Monitoring site operations and staff discipline.</p>
        </div>
        <div className="flex gap-2">
           <Button className="bg-critical hover:bg-critical/90 gap-2 shadow-lg shadow-critical/10 font-bold">
              <ShieldAlert className="h-4 w-4" /> Raise Breach Ticket
           </Button>
           <Button variant="outline" className="gap-2 font-bold">
              <Plus className="h-4 w-4" /> Post Notice
           </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
            { label: "Active Guards", value: "12 / 12", sub: "All posts occupied", color: "text-success", bg: "bg-success/5" },
            { label: "Checklist Status", value: "88%", sub: "Due in 2 hours", color: "text-primary", bg: "bg-primary/5" },
            { label: "SOS Alerts", value: "0", sub: "Last 24 hours", color: "text-muted-foreground", bg: "bg-muted/50" },
            { label: "New Visitors", value: "48", sub: "Since 8:00 AM", color: "text-info", bg: "bg-info/5" },
        ].map((stat, i) => (
            <Card key={i} className={cn("border-none shadow-card ring-1 ring-border p-4", stat.bg)}>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">{stat.label}</span>
                    <span className={cn("text-2xl font-bold", stat.color)}>{stat.value}</span>
                    <span className="text-[10px] font-bold text-muted-foreground/60">{stat.sub}</span>
                </div>
            </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
         <Card className="lg:col-span-2 border-none shadow-card ring-1 ring-border">
            <CardHeader className="border-b bg-muted/5">
                <CardTitle className="text-base font-bold uppercase ">Recent Staff Misconduct Tickets</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y text-left">
                  {[
                      { staff: "Amit K.", id: "EMP-402", reason: "Sleeping on Duty", time: "11:45 PM", severity: "High" },
                      { staff: "Rahul S.", id: "EMP-105", reason: "Uniform Violation", time: "09:00 AM", severity: "Low" },
                      { staff: "Suresh M.", id: "EMP-092", reason: "Absence from Post", time: "02:15 PM", severity: "Medium" },
                  ].map((ticket, i) => (
                      <div key={i} className="p-4 flex items-center justify-between group hover:bg-muted/20">
                          <div className="flex items-center gap-4">
                              <div className={cn("h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs uppercase", 
                                  ticket.severity === "High" ? "bg-critical/10 text-critical" : 
                                  ticket.severity === "Medium" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary")}>
                                  {ticket.severity.substring(0,1)}
                              </div>
                              <div className="flex flex-col">
                                  <span className="text-sm font-bold ">{ticket.staff} ({ticket.id})</span>
                                  <span className="text-xs text-muted-foreground">{ticket.reason}</span>
                              </div>
                          </div>
                          <div className="flex items-center gap-4">
                              <span className="text-[10px] font-bold text-muted-foreground uppercase">{ticket.time}</span>
                              <Button variant="ghost" size="sm" className="h-8 font-bold text-xs">View Proof</Button>
                          </div>
                      </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         <div className="space-y-6">
            <Card className="border-none shadow-card ring-1 ring-border">
                <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest">Patrol Efficiency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                            <span>Main Perimeter</span>
                            <span>98%</span>
                        </div>
                        <Progress value={98} className="h-1 bg-muted" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                            <span>Parking Level 1</span>
                            <span>45%</span>
                        </div>
                        <Progress value={45} className="h-1 bg-muted" />
                    </div>
                    <Button variant="ghost" className="w-full text-[10px] font-bold uppercase text-primary tracking-widest mt-2 border-dashed border-2">Review Patrol Logs <ArrowRight className="ml-2 h-3 w-3" /></Button>
                </CardContent>
            </Card>

            <Card className="border-none shadow-card ring-1 ring-border bg-linear-to-br from-primary to-primary/80 text-white">
                <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase text-white/70">Resident Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold">4.8 / 5</span>
                        <BarChart3 className="h-8 w-8 text-white/20" />
                    </div>
                    <p className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Avg Quality Score</p>
                </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
