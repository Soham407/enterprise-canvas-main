"use client";

import { Package, MapPin, CheckCircle, Navigation, QrCode, Phone, Clock, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function DeliveryDashboard() {
  return (
    <div className="max-w-md mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between pb-2 text-left">
          <div className="flex flex-col">
              <h1 className="text-xl font-bold ">Dispatch Ops</h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Route: SECTOR 45A</p>
          </div>
          <Button size="icon" variant="outline" className="h-10 w-10 border-muted-foreground/20">
              <QrCode className="h-5 w-5" />
          </Button>
      </div>

      <Card className="border-none shadow-premium bg-linear-to-br from-blue-700 to-indigo-900 text-white p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-full bg-white/5 skew-x-[-20deg] translate-x-10" />
          <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Navigation className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20 font-bold">ON TRACK</Badge>
              </div>
              <div className="text-left">
                  <span className="text-2xl font-bold">2.4 km</span>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">Next Drop: Lodha Altis</p>
              </div>
          </div>
      </Card>

      <div className="space-y-4">
          <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pending Deliveries (4)</h2>
              <Button variant="link" className="text-xs font-bold p-0">Optimizer</Button>
          </div>

          {[
              { id: "DL-102", customer: "Mrs. Sarah Connor", addr: "Wing A, Penthouse 1", pkg: "Cleaning Essentials (Box 1/2)", time: "Due in 15m" },
              { id: "DL-105", customer: "Vite Societies Office", addr: "Main Clubhouse", pkg: "Stationery Batch B", time: "Next Priority" },
          ].map((drop, i) => (
              <Card key={i} className="border-none shadow-card ring-1 ring-border p-4 text-left">
                  <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase text-primary mb-1">{drop.id}</span>
                          <span className="text-sm font-bold ">{drop.customer}</span>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase">
                              <MapPin className="h-3 w-3 text-muted-foreground" /> {drop.addr}
                          </div>
                      </div>
                      <div className="flex items-center gap-2">
                          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                              <Phone className="h-4 w-4" />
                          </Button>
                      </div>
                  </div>
                  <div className="mt-4 p-3 bg-muted/50 rounded-xl border border-dashed flex items-center justify-between">
                       <span className="text-[10px] font-bold text-muted-foreground">{drop.pkg}</span>
                       <span className="text-[10px] font-bold text-primary">{drop.time}</span>
                  </div>
                  <Button className="w-full mt-4 h-10 font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-primary/10">Deliver Now</Button>
              </Card>
          ))}
      </div>

      <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Shift Summary <MoreHorizontal className="ml-2 h-4 w-4" /></Button>
    </div>
  );
}
