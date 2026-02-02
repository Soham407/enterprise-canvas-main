"use client";

import { Shield, AlertCircle, CheckCircle2, QrCode, ClipboardList, MapPin, PhoneCall } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function GuardDashboard() {
  return (
    <div className="max-w-md mx-auto space-y-6 pb-20">
      {/* Panic Section */}
      <Card className="border-none bg-critical/10 shadow-lg shadow-critical/20">
        <CardContent className="p-8 text-center flex flex-col items-center gap-4">
          <div className="h-24 w-24 rounded-full bg-critical flex items-center justify-center shadow-2xl animate-pulse cursor-pointer hover:scale-105 transition-transform active:scale-95">
             <Shield className="h-12 w-12 text-white fill-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-critical uppercase ">Emergency Panic</h2>
            <p className="text-xs text-critical/70 font-bold uppercase tracking-widest mt-1">Press for 3 Seconds to Alert Manager</p>
          </div>
        </CardContent>
      </Card>

      {/* Duty Status */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-none shadow-card ring-1 ring-border p-4 bg-muted/20">
          <div className="flex flex-col gap-1">
             <span className="text-[10px] font-bold uppercase text-muted-foreground">Shift Time</span>
             <span className="text-sm font-bold">08:00 - 20:00</span>
             <Badge className="w-fit text-[8px] bg-success/10 text-success border-success/20 mt-1">ON DUTY</Badge>
          </div>
        </Card>
        <Card className="border-none shadow-card ring-1 ring-border p-4 bg-muted/20">
          <div className="flex flex-col gap-1">
             <span className="text-[10px] font-bold uppercase text-muted-foreground">Location</span>
             <span className="text-sm font-bold">Main Gate B</span>
             <div className="flex items-center gap-1 text-[8px] text-success font-bold uppercase mt-1">
                <MapPin className="h-2 w-2" /> Geo-Fenced
             </div>
          </div>
        </Card>
      </div>

      {/* Checklist Hub */}
      <Card className="border-none shadow-card ring-1 ring-border">
        <CardHeader className="pb-3 border-b bg-muted/5">
          <div className="flex items-center justify-between">
             <CardTitle className="text-sm font-bold uppercase  flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" />
                Daily Checklist
             </CardTitle>
             <Badge variant="outline" className="text-[10px] font-bold">4/6 DONE</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[
                { task: "Parking Lights ON/OFF check", status: "Done", time: "06:15 AM" },
                { task: "Water Pump Motor Status", status: "Done", time: "07:30 AM" },
                { task: "Secondary Gates Locked", status: "Pending" },
                { task: "Visitor Register Verified", status: "Pending" },
            ].map((item, i) => (
                <div key={i} className="p-4 flex items-center justify-between group cursor-pointer hover:bg-muted/30">
                    <div className="flex items-start gap-3">
                        <div className={cn("h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5", item.status === "Done" ? "bg-success border-success text-white" : "border-muted")}>
                           {item.status === "Done" && <CheckCircle2 className="h-3 w-3" />}
                        </div>
                        <div className="flex flex-col">
                           <span className={cn("text-xs font-bold", item.status === "Done" ? "text-muted-foreground line-through" : "text-foreground")}>{item.task}</span>
                           {item.time && <span className="text-[9px] text-muted-foreground">{item.time}</span>}
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
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quick Dial</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 pb-6">
              <Button variant="outline" className="h-10 justify-start gap-2 text-xs font-bold border-muted-foreground/20">
                 <PhoneCall className="h-3 w-3 text-primary" /> Police
              </Button>
              <Button variant="outline" className="h-10 justify-start gap-2 text-xs font-bold border-muted-foreground/20">
                 <AlertCircle className="h-3 w-3 text-critical" /> Fire
              </Button>
              <Button variant="outline" className="h-10 justify-start gap-2 text-xs font-bold border-muted-foreground/20">
                 <PhoneCall className="h-3 w-3 text-info" /> Ambulance
              </Button>
              <Button variant="outline" className="h-10 justify-start gap-2 text-xs font-bold border-muted-foreground/20">
                 <PhoneCall className="h-3 w-3 text-success" /> Supervisor
              </Button>
          </CardContent>
      </Card>
    </div>
  );
}
