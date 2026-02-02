"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Bug, 
  FlaskConical, 
  ShieldCheck, 
  Calendar, 
  AlertTriangle,
  ClipboardCheck,
  MoreHorizontal,
  Camera,
  MapPin,
  Clock,
  ExternalLink,
  Plus
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface PestService {
  id: string;
  type: "General Pest Control" | "Anti-Termite" | "Fogging";
  location: string;
  technician: string;
  chemicals: string;
  date: string;
  status: "Scheduled" | "Completed" | "Follow-up Required";
}

const data: PestService[] = [
  { id: "PST-402", type: "Anti-Termite", location: "Basement Foundation B-Sector", technician: "Vikram S.", chemicals: "Termidor SC (10L)", date: "2024-02-05", status: "Scheduled" },
  { id: "PST-399", type: "General Pest Control", location: "Clubhouse Kitchen", technician: "Vikram S.", chemicals: "Deltamethrin (1.5L)", date: "2024-02-01", status: "Completed" },
  { id: "PST-395", type: "Fogging", location: "Garden Perimeter", technician: "Anil K.", chemicals: "Pyrethrum Base", date: "2024-01-28", status: "Completed" },
];

export default function PestControlPage() {
  const columns: ColumnDef<PestService>[] = [
    {
      accessorKey: "type",
      header: "Service Type",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
            <Bug className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.type}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Execution Area",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium">{row.getValue("location")}</span>
        </div>
      ),
    },
    {
      accessorKey: "chemicals",
      header: "Chemical Usage",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <FlaskConical className="h-3.5 w-3.5 text-info" />
            <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">{row.getValue("chemicals")}</code>
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Service Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-bold">{row.getValue("date")}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Work Status",
      cell: ({ row }) => {
          const val = row.getValue("status") as string;
          const variants: Record<string, string> = {
              "Completed": "bg-success/10 text-success border-success/20",
              "Scheduled": "bg-primary/10 text-primary border-primary/20",
              "Follow-up Required": "bg-warning/10 text-warning border-warning/20"
          };
          return (
            <Badge variant="outline" className={cn("font-bold text-[10px] uppercase h-5", variants[val] || "")}>
                {val}
            </Badge>
          );
      },
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                <Camera className="h-4 w-4" />
             </Button>
             <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
             </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <PageHeader
        title="Pest Control Services"
        description="Hazardous chemical inventory management, recurring treatment schedules, and site-specific proof of service."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <FlaskConical className="h-4 w-4" /> Chemical Master
            </Button>
            <Button className="gap-2 shadow-sh-primary/10">
               <Plus className="h-4 w-4" /> New Treatment Plan
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-none shadow-card ring-1 ring-border p-4">
             <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-xl bg-info/5 text-info flex items-center justify-center">
                    <FlaskConical className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col text-left">
                    <span className="text-2xl font-bold ">12L</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Chemical Levels Low</span>
                 </div>
             </div>
        </Card>
        <Card className="border-none shadow-card ring-1 ring-border p-4">
             <div className="flex items-center gap-4 text-left">
                 <div className="h-10 w-10 rounded-xl bg-warning/5 text-warning flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-bold ">3</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Expiring Batches</span>
                 </div>
             </div>
        </Card>
        <Card className="border-none shadow-card ring-1 ring-border p-4">
             <div className="flex items-center gap-4 text-left">
                 <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                    <Clock className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-bold ">8</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Pending Services</span>
                 </div>
             </div>
        </Card>
        <Card className="border-none shadow-card ring-1 ring-border p-4">
             <div className="flex items-center gap-4 text-left">
                 <div className="h-10 w-10 rounded-xl bg-success/5 text-success flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col text-left">
                    <span className="text-2xl font-bold ">96%</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Safety Compliance</span>
                 </div>
             </div>
        </Card>
      </div>

      <Tabs defaultValue="services" className="w-full">
            <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-8">
                <TabsTrigger value="services" className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-widest">Service Log</TabsTrigger>
                <TabsTrigger value="chemicals" className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-widest">Chemical Stock</TabsTrigger>
                <TabsTrigger value="ppe" className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-widest">PPE Checklists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="pt-6">
                <DataTable columns={columns} data={data} searchKey="type" />
            </TabsContent>

            <TabsContent value="chemicals" className="pt-6">
                 <div className="grid gap-6 md:grid-cols-3">
                    {[
                        { name: "Deltamethrin 2.5%", qty: "8L", expiry: "2024-05-10", type: "Insecticide", hazard: "Toxic" },
                        { name: "Bromadiolone", qty: "45 blocks", expiry: "2024-03-22", type: "Rodenticide", hazard: "Highly Toxic" },
                        { name: "Termidor SC", qty: "15L", expiry: "2025-01-15", type: "Termiticide", hazard: "Irritant" },
                    ].map((chem, i) => (
                        <Card key={i} className="border-none shadow-card ring-1 ring-border">
                            <CardHeader className="p-4 pb-2">
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-[8px] uppercase font-bold bg-muted">{chem.type}</Badge>
                                    <Badge variant="outline" className={cn("text-[8px] uppercase font-bold", chem.hazard === "Highly Toxic" ? "bg-critical/10 text-critical border-critical/20" : "")}>{chem.hazard}</Badge>
                                </div>
                                <CardTitle className="text-sm font-bold mt-2">{chem.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-2 space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase">
                                    <span>Quantity</span>
                                    <span className="text-foreground">{chem.qty}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase">
                                    <span>Expiry Alert</span>
                                    <span className={cn("text-foreground", i === 1 ? "text-critical animate-pulse" : "")}>{chem.expiry}</span>
                                </div>
                                <Button variant="outline" className="w-full text-[10px] font-bold h-7 gap-2"> <ExternalLink className="h-3 w-3" /> MSDS Sheet </Button>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </TabsContent>

            <TabsContent value="ppe" className="pt-6">
                <Card className="border-none shadow-card ring-1 ring-border">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold">Mandatory Gear Verification (PPE)</CardTitle>
                        <CardDescription className="text-xs">Technicians must verify these items before dispatch.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { item: "Chemical Resistant Gloves", mandatory: true, status: "Verified" },
                            { item: "N95 Respiration Mask", mandatory: true, status: "Verified" },
                            { item: "Protective Eyewear/Goggles", mandatory: true, status: "Pending" },
                            { item: "First Aid & Spill Kit", mandatory: true, status: "Verified" },
                        ].map((ppe, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-dashed">
                                <div className="flex items-center gap-3">
                                    <div className={cn("h-6 w-6 rounded-full flex items-center justify-center", ppe.status === "Verified" ? "bg-success/20 text-success" : "bg-warning/20 text-warning")}>
                                        <ShieldCheck className="h-3.5 w-3.5" />
                                    </div>
                                    <span className="text-xs font-bold">{ppe.item}</span>
                                </div>
                                <Badge variant="secondary" className="text-[10px] font-bold uppercase">{ppe.status}</Badge>
                            </div>
                        ))}
                        <Button className="w-full shadow-lg shadow-primary/20">Submit Site Readiness Report</Button>
                    </CardContent>
                </Card>
            </TabsContent>
      </Tabs>
    </div>
  );
}
