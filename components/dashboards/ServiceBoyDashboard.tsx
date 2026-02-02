"use client";

import { Wrench, Camera, Play, CheckCircle, Clock, MapPin, ClipboardCheck, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ServiceBoyDashboard() {
  return (
    <div className="max-w-md mx-auto space-y-6 pb-20">
      <div className="flex flex-col text-left">
          <h1 className="text-xl font-bold ">Technician Portal</h1>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Jobs & Service Workflows</p>
      </div>

      {/* Active Job Highlight */}
      <Card className="border-none shadow-card ring-1 ring-border p-4 bg-muted/20 border-l-4 border-l-primary">
          <div className="flex flex-col gap-4 text-left">
              <div className="flex items-center justify-between">
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold uppercase">CURRENT JOB</Badge>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">ID: TKT-2901</span>
              </div>
              <div>
                  <h3 className="text-lg font-bold ">AC Leakage & Gas Refill</h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase mt-1">
                      <MapPin className="h-3 w-3" /> Tower B, Flat 902
                  </div>
              </div>
              <div className="flex gap-2">
                   <Button className="flex-1 font-bold uppercase text-[10px] tracking-widest gap-2 bg-success hover:bg-success/90 h-10 shadow-lg shadow-success/10">
                       <Play className="h-3.5 w-3.5 fill-white" /> Start Work
                   </Button>
                   <Button variant="outline" className="flex-1 font-bold uppercase text-[10px] tracking-widest gap-2 h-10 border-muted-foreground/20">
                       <Camera className="h-3.5 w-3.5" /> Before Pic
                   </Button>
              </div>
          </div>
      </Card>

      <div className="space-y-4">
          <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Assigned Tasks (2)</h2>
              <Button variant="link" className="text-xs font-bold p-0">Service Log</Button>
          </div>

          {[
              { id: "JOB-402", type: "Pest Control (General)", loc: "Clubhouse Kitchen", time: "04:00 PM", priority: "Normal" },
              { id: "JOB-405", type: "Water Pump Inspection", loc: "Basement B2", time: "05:30 PM", priority: "High" },
          ].map((job, i) => (
              <Card key={i} className="border-none shadow-card ring-1 ring-border p-4 text-left group hover:ring-primary/40 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold ">{job.type}</span>
                            <span className="text-[9px] font-bold text-muted-foreground uppercase">{job.id}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className={cn("text-[9px] font-bold", job.priority === "High" ? "bg-critical/5 text-critical border-critical/20" : "")}>{job.priority}</Badge>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {job.loc}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase">
                          <Clock className="h-3 w-3" /> {job.time}
                      </div>
                  </div>
              </Card>
          ))}
      </div>

      {/* Mandatory Equipment */}
      <Card className="border-none shadow-card ring-1 ring-border">
          <CardHeader className="bg-muted/5 border-b pb-3">
              <div className="flex items-center justify-between">
                  <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Stock Check (AC Gas)</CardTitle>
                  <AlertCircle className="h-4 w-4 text-critical animate-pulse" />
              </div>
          </CardHeader>
          <CardContent className="p-4 flex items-center justify-between">
              <div className="flex flex-col">
                  <span className="text-sm font-bold">R410A Refrigerant</span>
                  <span className="text-[10px] text-muted-foreground">Last issued: 2.5kg</span>
              </div>
              <div className="text-right">
                  <span className="text-sm font-bold text-critical uppercase">Low Stock</span>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase">Reorder via PO</p>
              </div>
          </CardContent>
      </Card>
    </div>
  );
}
