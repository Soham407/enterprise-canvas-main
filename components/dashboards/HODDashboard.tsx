"use client";

import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip } from "recharts";
import { Users, Briefcase, CalendarCheck, CheckSquare, Clock, ArrowRight, UserPlus, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const distribution = [
  { name: "Active", value: 65, color: "hsl(var(--primary))" },
  { name: "On Leave", value: 12, color: "hsl(var(--warning))" },
  { name: "Off Duty", value: 23, color: "hsl(var(--muted-foreground))" },
];

export function HODDashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold ">Departmental Management (HOD)</h1>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Team productivity, leave approvals, and resource allocation.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2 font-bold border-muted-foreground/20">
               <Filter className="h-4 w-4" /> Filter Dept
           </Button>
           <Button className="gap-2 font-bold shadow-lg shadow-primary/10">
               <UserPlus className="h-4 w-4" /> Personnel Req
           </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
            { label: "Total Strength", value: "248", icon: Users, color: "text-primary" },
            { label: "Attendance Target", value: "98%", icon: CalendarCheck, color: "text-success" },
            { label: "Pending Approvals", value: "14", icon: Clock, color: "text-warning" },
            { label: "Tasks Completed", value: "842", icon: CheckSquare, color: "text-info" },
        ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
                <div className="flex items-center gap-4 text-left">
                    <div className={cn("h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center", stat.color)}>
                        <stat.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold ">{stat.value}</span>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest leading-none mt-1">{stat.label}</span>
                    </div>
                </div>
            </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
         <Card className="lg:col-span-2 border-none shadow-card ring-1 ring-border">
            <CardHeader className="bg-muted/5 border-b">
               <CardTitle className="text-sm font-bold uppercase ">Team Leave Applications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y text-left">
                  {[
                      { user: "Sarah Connor", dept: "Facility Ops", type: "Sick Leave", dates: "Feb 5 - Feb 7", reason: "Medical Appointment" },
                      { user: "Mike Ross", dept: "Facility Ops", type: "Casual Leave", dates: "Feb 10", reason: "Family Function" },
                      { user: "Rachel Zane", dept: "Facility Ops", type: "Paid Leave", dates: "Feb 12 - Feb 15", reason: "Vacation" },
                  ].map((req, i) => (
                      <div key={i} className="p-4 flex items-center justify-between group hover:bg-muted/20 transition-colors">
                          <div className="flex items-center gap-4">
                              <Avatar className="h-9 w-9 ring-2 ring-primary/5">
                                  <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-bold">{req.user.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                  <span className="text-sm font-bold ">{req.user}</span>
                                  <span className="text-[10px] text-muted-foreground font-bold uppercase ">{req.type} • {req.dates}</span>
                              </div>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold uppercase text-success border-success/20 hover:bg-success/5">Approve</Button>
                              <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold uppercase text-critical border-critical/20 hover:bg-critical/5">Reject</Button>
                          </div>
                      </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         <Card className="border-none shadow-card ring-1 ring-border">
            <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Force Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={distribution} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                    {distribution.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-xs font-bold">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-muted-foreground">{item.name}</span>
                            </div>
                            <span>{item.value}%</span>
                        </div>
                    ))}
                </div>
                <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-primary mt-6 border-dashed border-2">Redeploy Resources <ArrowRight className="ml-2 h-3 w-3" /></Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
