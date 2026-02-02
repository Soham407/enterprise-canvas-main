"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { 
  Sprout, 
  Droplet, 
  Leaf, 
  Calendar, 
  UserCheck, 
  MoreHorizontal, 
  History,
  CloudSun,
  MapPin,
  ClipboardCheck,
  TrendingUp,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface PlantationJob {
  id: string;
  zone: string;
  task: string;
  priority: "High" | "Normal";
  technician: string;
  status: "Scheduled" | "Completed" | "Overdue";
}

const activeJobs: PlantationJob[] = [
  { id: "PLT-101", zone: "Main Lawn & Gateway", task: "Soil Turning & Manure Application", priority: "High", technician: "M. Kumar", status: "Scheduled" },
  { id: "PLT-102", zone: "Wing A Terrace Garden", task: "Pruning & Trimming", priority: "Normal", technician: "K. Singh", status: "Scheduled" },
  { id: "PLT-110", zone: "Clubhouse Perimeter", task: "Hydraulic Watering", priority: "High", technician: "S. Yadav", status: "Overdue" },
];

export default function PlantationPage() {
  const columns: ColumnDef<PlantationJob>[] = [
    {
      accessorKey: "zone",
      header: "Deployment Zone",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-success/50" />
          <span className="font-bold text-sm ">{row.getValue("zone")}</span>
        </div>
      ),
    },
    {
      accessorKey: "task",
      header: "Horticulture Task",
      cell: ({ row }) => <span className="text-sm font-medium text-muted-foreground">{row.getValue("task")}</span>,
    },
    {
      accessorKey: "technician",
      header: "Gardener",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
             <Avatar className="h-6 w-6 border">
                <AvatarFallback className="bg-muted text-[8px] font-bold">{row.original.technician.substring(0,2)}</AvatarFallback>
             </Avatar>
             <span className="text-xs font-bold">{row.original.technician}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
          const val = row.getValue("status") as string;
          return (
            <Badge variant="outline" className={cn(
                "font-bold text-[10px] uppercase h-5",
                val === "Completed" ? "bg-success/10 text-success border-success/20" :
                val === "Overdue" ? "bg-critical/10 text-critical border-critical/20 animate-pulse-soft" : "bg-primary/10 text-primary border-primary/20"
            )}>
                {val}
            </Badge>
          );
      }
    },
    {
      id: "actions",
      cell: () => (
        <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-8 pb-10 font-sans">
      <PageHeader
        title="Plantation Services"
        description="Monitor horticulture activities, soil health, and greenery maintenance cycles across society zones."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <History className="h-4 w-4" /> History
            </Button>
            <Button className="gap-2 shadow-lg shadow-success/20 bg-success hover:bg-success/90">
               <Sprout className="h-4 w-4" /> Schedule Task
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Active Cycles", value: "12", sub: "Watering & Pruning", icon: Droplet, color: "text-info" },
          { label: "Gardeners", value: "6", sub: "On-site today", icon: UserCheck, color: "text-primary" },
          { label: "Soil Health", value: "98%", sub: "PH Verified", icon: Leaf, color: "text-success" },
          { label: "Zone Stats", value: "4", icon: CloudSun, color: "text-warning", sub: "Greenery density 84%" },
        ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
               <div className="flex items-center gap-4 text-left">
                    <div className={cn("h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center", stat.color)}>
                        <stat.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold ">{stat.value}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</span>
                    </div>
               </div>
            </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
              <Card className="border-none shadow-card ring-1 ring-border overflow-hidden">
                  <CardHeader className="bg-muted/30 border-b">
                      <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-bold flex items-center gap-2 italic lowercase capitalize ">
                            <ClipboardCheck className="h-4 w-4 text-primary" />
                            Pending Field Operations
                          </CardTitle>
                          <Badge variant="outline" className="text-[10px] font-bold bg-success/5 text-success border-success/20">LIVE OPS</Badge>
                      </div>
                  </CardHeader>
                  <DataTable columns={columns} data={activeJobs} searchKey="zone" />
              </Card>
          </div>
          <div className="space-y-6">
              <Card className="border-none shadow-card ring-1 ring-border">
                  <CardHeader>
                      <CardTitle className="text-sm font-bold ">Horticulture Inventory</CardTitle>
                      <CardDescription className="text-xs">Seeds, Manure, and Tools.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      {[
                          { item: "Organic Cow Manure", qty: "24 kg", status: "Stable" },
                          { item: "Liquid Fertilizer", qty: "2.5 L", status: "Low" },
                          { item: "Seasonal Flower Seeds", qty: "12 packs", status: "Stable" },
                      ].map((inv, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-dashed">
                              <div className="flex flex-col">
                                  <span className="text-xs font-bold">{inv.item}</span>
                                  <span className="text-[10px] text-muted-foreground">{inv.qty}</span>
                              </div>
                              <Badge variant="outline" className={cn("text-[9px] font-bold h-4", inv.status === "Low" ? "text-critical border-critical/20 bg-critical/5 animate-pulse" : "border-none")}>{inv.status}</Badge>
                          </div>
                      ))}
                      <Button variant="ghost" className="w-full text-[10px] font-bold uppercase text-primary tracking-widest mt-2">Open Store Manager</Button>
                  </CardContent>
              </Card>

              <Card className="border-none shadow-card ring-1 ring-border bg-linear-to-br from-success/5 to-transparent">
                  <CardHeader>
                      <CardTitle className="text-sm font-bold ">Seasonal Planner</CardTitle>
                      <CardDescription className="text-xs italic">Next 30 days forecast.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-success/10 text-success flex items-center justify-center font-bold text-xs">Feb</div>
                          <div className="flex flex-col">
                              <span className="text-xs font-bold">Monsoon Prep Phase 1</span>
                              <span className="text-[10px] text-muted-foreground">Cleaning of all perimeter planters.</span>
                          </div>
                      </div>
                      <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs">Mar</div>
                          <div className="flex flex-col">
                              <span className="text-xs font-bold">Summer Flower Sowing</span>
                              <span className="text-[10px] text-muted-foreground">Transition to heat-resistant crops.</span>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
    </div>
  );
}
