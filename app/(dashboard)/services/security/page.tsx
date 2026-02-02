"use client";

import { Shield, MapPin, Camera, Video, History, AlertCircle, UserCheck, Activity, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function SecurityPage() {
  const guards = [
    { id: "G-01", name: "Robert Wilson", location: "Main Gate", battery: "85%", status: "Active", lastPatrol: "10 mins ago" },
    { id: "G-02", name: "Sam Harris", location: "Tower B - Lobby", battery: "42%", status: "Active", lastPatrol: "2 mins ago" },
    { id: "G-03", name: "Tina Fey", location: "Parking Level 1", battery: "98%", status: "On Break", lastPatrol: "45 mins ago" },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="module-header">
        <h1 className="module-title font-bold flex items-center gap-3">
           <Shield className="h-8 w-8 text-primary" />
           Security Command Center
        </h1>
        <p className="module-description">Monitor real-time guard locations, patrolling status, and panic alerts.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
         {/* Live Map Placeholder */}
         <Card className="lg:col-span-2 border-none shadow-card ring-1 ring-border min-h-[500px] flex flex-col">
            <CardHeader className="border-b bg-muted/30">
               <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                     <MapPin className="h-4 w-4 text-primary" />
                     Live Asset Tracking
                  </CardTitle>
                  <Badge variant="outline" className="animate-pulse-soft bg-success/10 text-success border-success/20">
                     Live Feed Active
                  </Badge>
               </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative overflow-hidden bg-muted/20">
               {/* Mock Map UI */}
               <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-74.00,40.71,12/800x600?access_token=pk.xxx')] bg-cover opacity-50 grayscale" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4 text-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl max-w-xs ring-1 ring-border">
                     <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Smartphone className="h-6 w-6 text-primary" />
                     </div>
                     <h3 className="font-bold">GPS Integration Pending</h3>
                     <p className="text-xs text-muted-foreground">Map view is mocked for UI purposes. In production, this integrates with Leaflet or Google Maps via GeoJSON.</p>
                  </div>
               </div>

               {/* Map Markers Overlay */}
               <div className="absolute top-1/4 left-1/3">
                  <div className="relative group cursor-pointer">
                     <div className="h-4 w-4 bg-primary rounded-full border-2 border-white shadow-lg animate-ping absolute" />
                     <div className="h-4 w-4 bg-primary rounded-full border-2 border-white shadow-lg relative" />
                     <div className="absolute top-6 left-0 translate-x-[-40%] opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-card shadow-xl p-2 rounded-lg border min-w-[120px]">
                           <p className="text-[10px] font-bold">Robert Wilson</p>
                           <p className="text-[8px] text-muted-foreground uppercase">Main Gate</p>
                        </div>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Guard List */}
         <Card className="border-none shadow-card ring-1 ring-border">
            <CardHeader>
               <CardTitle className="text-base font-bold">Personnel on Duty</CardTitle>
               <CardDescription>Live status of security staff.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y">
                  {guards.map((guard) => (
                    <div key={guard.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center gap-4">
                       <Avatar className="h-10 w-10 ring-2 ring-primary/5">
                          <AvatarFallback className="text-[10px] font-bold">{guard.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                       </Avatar>
                       <div className="flex-1">
                          <div className="flex items-center justify-between">
                             <span className="text-sm font-bold ">{guard.name}</span>
                             <span className="text-[10px] font-bold text-muted-foreground">{guard.battery} 🔋</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                             <MapPin className="h-3 w-3 text-muted-foreground" />
                             <span className="text-xs text-muted-foreground">{guard.location}</span>
                          </div>
                       </div>
                       <StatusBadge status={guard.status === "Active" ? "success" : "warning"} className="text-[10px]" />
                    </div>
                  ))}
               </div>
               <div className="p-4 border-t">
                  <Button variant="outline" className="w-full text-xs font-bold gap-2">
                     <AlertCircle className="h-3 w-3" />
                     Broadcast Alert to All
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         {/* Patch Checklist */}
         <Card className="border-none shadow-card ring-1 ring-border">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-lg font-bold">Incident Reporting</CardTitle>
                  <CardDescription>Submit and track security incidents with evidence.</CardDescription>
               </div>
               <Button className="bg-critical hover:bg-critical/90 gap-2 h-9 px-4 font-bold shadow-lg shadow-critical/20">
                  <AlertCircle className="h-4 w-4" />
                  Raise Panic
               </Button>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="p-10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 bg-muted/10 group hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-center">
                     <p className="font-bold text-sm">Upload Evidence</p>
                     <p className="text-xs text-muted-foreground">Drag and drop photos or videos from the site</p>
                  </div>
               </div>

               <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square rounded-xl bg-muted/30 border flex items-center justify-center relative overflow-hidden group">
                       <Video className="h-6 w-6 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                       <div className="absolute bottom-0 left-0 right-0 p-1 bg-black/50 text-[8px] text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                          cam_04_id_{i}.mp4
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Patrol Log */}
         <Card className="border-none shadow-card ring-1 ring-border">
             <CardHeader className="flex flex-row items-center justify-between">
                <div>
                   <CardTitle className="text-lg font-bold">Inactivity & Compliance</CardTitle>
                   <CardDescription>Automated alerts for static guards or missing checklists.</CardDescription>
                </div>
                <Badge variant="outline" className="bg-critical/5 text-critical border-critical/20 animate-pulse-soft">
                   3 Active Alerts
                </Badge>
             </CardHeader>
             <CardContent className="space-y-4">
                {[
                   { type: "Inactivity", guard: "G-03 (Tina Fey)", loc: "Parking Level 1", duration: "45m", severity: "High" },
                   { type: "Checklist Missing", guard: "G-01 (Robert Wilson)", loc: "Main Gate", duration: "Due 9:00 AM", severity: "Medium" },
                ].map((alert, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-critical/5 border border-critical/10 shadow-sm">
                      <div className="flex flex-col">
                         <div className="flex items-center gap-2">
                           <span className="text-xs font-bold text-critical uppercase">{alert.type}</span>
                           <span className="text-[10px] bg-critical/10 px-1 rounded font-bold text-critical lowercase capitalize">{alert.severity}</span>
                         </div>
                         <span className="text-sm font-bold  mt-1">{alert.guard}</span>
                         <span className="text-[10px] text-muted-foreground">{alert.loc} • {alert.duration}</span>
                      </div>
                      <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold border-critical/20 hover:bg-critical/10">Broadcast Call</Button>
                   </div>
                ))}
                <div className="p-4 bg-muted/30 rounded-xl border border-dashed text-center">
                   <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Geo-Fencing Heartbeat: Healthy</p>
                </div>
             </CardContent>
         </Card>
      </div>
    </div>
  );
}
