"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  MapPin, 
  Phone, 
  BellRing, 
  CheckCircle,
  Clock,
  ShieldAlert,
  Navigation,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PanicAlert {
  id: string;
  sender: string;
  location: string;
  time: string;
  type: "Medical" | "Fire" | "Security" | "Theft";
  status: "Active" | "Responding" | "Resolved";
  distance: string;
}

const activeAlerts: PanicAlert[] = [
  { id: "SOS-501", sender: "Guard: John Doe", location: "Gate No. 2 (North)", time: "Just Now", type: "Security", status: "Active", distance: "45m away" },
  { id: "SOS-502", sender: "Guard: Michael Smith", location: "Basement B1 - Section D", time: "4 mins ago", type: "Medical", status: "Responding", distance: "120m away" },
];

export default function PanicAlertsPage() {
  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <PageHeader
        title="Panic Response Center"
        description="Real-time emergency monitoring and SOS alert coordination hub."
        actions={
          <Button variant="destructive" className="gap-2 animate-pulse shadow-lg shadow-destructive/20 font-bold uppercase tracking-widest text-[10px] h-11 px-6">
            <ShieldAlert className="h-4 w-4" /> Trigger Emergency
          </Button>
        }
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Active Emergency Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <BellRing className="h-4 w-4 text-critical" /> Live Emergency Feed
            </h3>
            <Badge variant="outline" className="text-critical bg-critical/5 border-critical/20 font-bold px-3">
                {activeAlerts.filter(a => a.status === 'Active').length} Active Threats
            </Badge>
          </div>

          <div className="grid gap-4">
            {activeAlerts.map((alert) => (
              <Card key={alert.id} className={cn(
                "border-none shadow-premium overflow-hidden transition-all duration-300",
                alert.status === "Active" ? "ring-2 ring-critical animate-pulse-soft" : "ring-1 ring-border"
              )}>
                <CardContent className="p-0">
                  <div className="flex">
                    <div className={cn(
                        "w-2 shrink-0",
                        alert.status === "Active" ? "bg-critical" : "bg-warning"
                    )} />
                    <div className="flex-1 p-6">
                       <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg",
                                    alert.status === "Active" ? "bg-critical text-white shadow-critical/20" : "bg-warning text-white shadow-warning/20"
                                )}>
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="font-extrabold text-lg ">{alert.type} Emergency</span>
                                        <Badge variant="outline" className="text-[10px] h-4 px-1.5 uppercase font-bold border-current/20 font-mono italic">{alert.id}</Badge>
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground">{alert.sender}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-bold text-critical uppercase ">{alert.time}</span>
                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium justify-end">
                                    <Navigation className="h-3 w-3" /> {alert.distance}
                                </div>
                            </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-muted/50 border border-dashed flex flex-col gap-1">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Incident Location</span>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-3.5 w-3.5 text-primary" />
                                    <span className="text-sm font-bold">{alert.location}</span>
                                </div>
                            </div>
                            <div className="p-3 rounded-xl bg-muted/50 border border-dashed flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Response Status</span>
                                    <span className="text-sm font-bold">{alert.status}</span>
                                </div>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </div>
                       </div>

                       <div className="flex gap-2">
                            <Button className="flex-1 gap-2 bg-critical hover:bg-critical/90 shadow-lg shadow-critical/20">
                                <CheckCircle className="h-4 w-4" /> Resolve Incident
                            </Button>
                            <Button variant="outline" className="flex-1 gap-2 border-primary/20 hover:bg-primary/5">
                                <ChevronRight className="h-4 w-4" /> Dispatch Backup
                            </Button>
                            <Button variant="ghost" size="icon" className="shrink-0 border">
                                <ExternalLink className="h-4 w-4" />
                            </Button>
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar / Tools */}
        <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Emergency Contacts</h3>
            <Card className="border-none shadow-card ring-1 ring-border">
                <CardContent className="p-0">
                    <div className="divide-y">
                        {[
                          { name: "Local Police", phone: "100 / (555) 911-0000", sub: "Main District Station" },
                          { name: "Fire Brigade", phone: "101 / (555) 911-0011", sub: "Sector 24 Hub" },
                          { name: "Ambulance", phone: "102 / (555) 911-0022", sub: "City General Hospital" },
                          { name: "Head of Security", phone: "+91 90000 11111", sub: "HQ Primary Contact" },
                        ].map((contact, i) => (
                          <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors group cursor-pointer">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-bold  group-hover:text-primary transition-colors">{contact.name}</span>
                                <span className="text-xs text-muted-foreground">{contact.sub}</span>
                                <span className="text-xs font-mono font-bold mt-1 text-foreground/80">{contact.phone}</span>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <Phone className="h-4 w-4" />
                            </div>
                          </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground border-none shadow-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ShieldAlert className="h-24 w-24" />
                </div>
                <CardHeader>
                    <CardTitle className="text-lg">Response Protocol</CardTitle>
                    <CardDescription className="text-primary-foreground/70">Automatic workflows initiated upon panic triggers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm font-medium">
                    <div className="flex gap-3 items-center">
                        <div className="h-6 w-6 rounded bg-white/20 flex items-center justify-center text-[10px]">1</div>
                        <span>SMS notifications to Society Committee</span>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="h-6 w-6 rounded bg-white/20 flex items-center justify-center text-[10px]">2</div>
                        <span>GPS Tracking pinned to Manager Dashboard</span>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="h-6 w-6 rounded bg-white/20 flex items-center justify-center text-[10px]">3</div>
                        <span>Logging of guard-side camera footage</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
