"use client";

import { ShoppingCart, Users, Wrench, Package, History, ChevronRight, Plus, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function BuyerDashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold ">Order & Requisition Portal</h1>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Select service category and specify requirements.</p>
        </div>
        <Button className="font-bold gap-2 shadow-xl shadow-primary/10">
           <History className="h-4 w-4" /> My Active Orders
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         {[
             { title: "Security Services", icon: Users, grades: "Grades A, B, C, D", color: "bg-blue-500", desc: "Armed Gunmen, Door Keepers." },
             { title: "Technical Staff", icon: Wrench, grades: "Plumbers, Electricians", color: "bg-emerald-500", desc: "AC Maintenance, Lift Techs." },
             { title: "Soft Services", icon: Package, grades: "Housekeeping, Pantry", color: "bg-amber-500", desc: "Cleaners, Office Boys/Girls." },
         ].map((cat, i) => (
             <Card key={i} className="group border-none shadow-card ring-1 ring-border p-6 cursor-pointer hover:ring-primary/50 transition-all text-left">
                 <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg", cat.color)}>
                    <cat.icon className="h-6 w-6" />
                 </div>
                 <h3 className="text-lg font-bold  mb-1">{cat.title}</h3>
                 <p className="text-xs text-muted-foreground font-medium mb-4">{cat.desc}</p>
                 <div className="p-3 bg-muted/50 rounded-xl border border-dashed text-[10px] font-bold text-muted-foreground mb-6">
                    MAPPING: {cat.grades}
                 </div>
                 <Button className="w-full font-bold uppercase text-[10px] tracking-widest group-hover:bg-primary group-hover:text-white transition-all">Select & Customize</Button>
             </Card>
         ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
         <Card className="border-none shadow-card ring-1 ring-border">
            <CardHeader className="bg-muted/5 border-b">
               <CardTitle className="text-sm font-bold uppercase ">Current Deployment Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y text-left">
                  {[
                      { order: "ORD-901", service: "Security (Grade B)", qty: "4 Guards", status: "Personnel Dispatched", time: "Arriving 02:00 PM" },
                      { order: "ORD-894", service: "Pantry Boy", qty: "1 Member", status: "Awaiting Admin Approval", time: "Pending" },
                      { order: "ORD-882", service: "Technical (AC)", qty: "2 Technicians", status: "Deployment Confirmed", time: "On-site" },
                  ].map((order, i) => (
                      <div key={i} className="p-4 flex items-center justify-between group hover:bg-muted/30">
                          <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold uppercase text-primary">{order.order}</span>
                                  <Badge variant="outline" className="text-[9px] font-bold bg-muted/50">{order.qty}</Badge>
                              </div>
                              <span className="text-sm font-bold  mt-1">{order.service}</span>
                          </div>
                          <div className="flex flex-col items-end">
                              <span className={cn("text-[10px] font-bold uppercase", order.status === "Deployment Confirmed" ? "text-success" : "text-primary")}>{order.status}</span>
                              <span className="text-[10px] text-muted-foreground font-bold">{order.time}</span>
                          </div>
                      </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         <Card className="border-none shadow-card ring-1 ring-border p-6 bg-linear-to-br from-indigo-600 to-indigo-800 text-white">
             <div className="flex flex-col h-full justify-between gap-8">
                 <div className="space-y-2 text-left">
                     <h2 className="text-2xl font-bold leading-tight uppercase">Custom Requisition?</h2>
                     <p className="text-xs text-indigo-100/70 font-medium">Define specific headcounts, shift timings, and durations for one-off deployments.</p>
                 </div>
                 <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Plus className="h-5 w-5" />
                     </div>
                     <span className="text-sm font-bold border-b border-white/30 cursor-pointer">Start Requisition Wizard</span>
                 </div>
             </div>
         </Card>
      </div>
    </div>
  );
}
