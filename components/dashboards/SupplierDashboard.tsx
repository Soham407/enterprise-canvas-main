"use client";

import { Bell, UserCheck, Package, Clock, Check, X, FileSearch, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SupplierDashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold ">Vendor Fulfillment Portal</h1>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Review indents and manage personnel roster.</p>
        </div>
        <div className="flex items-center gap-3">
           <Badge variant="outline" className="h-8 px-4 gap-2 bg-primary/5 border-primary/20 text-primary animate-pulse-soft font-bold">
              <Bell className="h-3 w-3" /> 3 New Indents
           </Badge>
           <Button variant="outline" className="gap-2 font-bold shadow-sm">
               <UserCheck className="h-4 w-4" /> Roster Management
           </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         <Card className="border-none shadow-card ring-1 ring-border p-4 bg-muted/20">
             <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Package className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col text-left">
                    <span className="text-2xl font-bold">14</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Open Indents</span>
                 </div>
             </div>
         </Card>
         <Card className="border-none shadow-card ring-1 ring-border p-4 bg-muted/20">
             <div className="flex items-center gap-4 text-left">
                 <div className="h-10 w-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
                    <Check className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-bold">₹3.2M</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Billed This Month</span>
                 </div>
             </div>
         </Card>
         <Card className="border-none shadow-card ring-1 ring-border p-4 bg-muted/20">
             <div className="flex items-center gap-4 text-left">
                 <div className="h-10 w-10 rounded-xl bg-info/10 text-info flex items-center justify-center">
                    <UserCheck className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-bold">124</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Active Personnel</span>
                 </div>
             </div>
         </Card>
      </div>

      <div className="space-y-4">
          <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Action Required: New Indents</h2>
              <Button variant="link" className="text-xs font-bold p-0">View All</Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {[
                { id: "IND-2024-001", buyer: "Lodha Tech Park", requirement: "4x Security Grade A", timeline: "Feb 5 - Feb 15", rate: "₹1,200/Shift" },
                { id: "IND-2024-005", buyer: "Vite Residencies", requirement: "2x Pantry Staff", timeline: "Permanent", rate: "₹22,500/Mo" },
            ].map((indent, i) => (
                <Card key={i} className="border-none shadow-card ring-1 ring-border overflow-hidden">
                    <CardHeader className="p-4 bg-muted/5 border-b">
                         <div className="flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-primary" />
                                <span className="text-xs font-bold uppercase">{indent.buyer}</span>
                             </div>
                             <span className="text-[10px] font-bold font-mono text-muted-foreground">{indent.id}</span>
                         </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4 text-left">
                         <div className="space-y-1">
                             <p className="text-sm font-bold ">{indent.requirement}</p>
                             <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase">
                                    <Clock className="h-3 w-3" /> {indent.timeline}
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase">
                                    <Check className="h-3 w-3" /> {indent.rate}
                                </div>
                             </div>
                         </div>
                         <div className="flex gap-2 pt-2 border-t">
                             <Button className="flex-1 font-bold uppercase text-[10px] tracking-widest bg-success hover:bg-success/90 h-9">Indent Accept</Button>
                             <Button variant="outline" className="flex-1 font-bold uppercase text-[10px] tracking-widest text-critical border-critical/20 hover:bg-critical/5 h-9">Indent Reject</Button>
                         </div>
                    </CardContent>
                </Card>
            ))}
          </div>
      </div>

      <Card className="border-none shadow-card ring-1 ring-border">
          <CardHeader className="bg-muted/5 border-b">
              <CardTitle className="text-sm font-bold uppercase ">Live Deployment Map</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center text-muted-foreground flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <FileSearch className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest">Interactive map showing assigned personnel locations will render here.</p>
          </CardContent>
      </Card>
    </div>
  );
}
