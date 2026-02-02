"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  Wind, 
  Thermometer, 
  Settings, 
  UserCheck, 
  ClipboardCheck,
  Calendar,
  MoreHorizontal,
  ArrowUpRight,
  Clock,
  Camera,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface ServiceRequest {
  id: string;
  resident: string;
  flatNo: string;
  issue: string;
  priority: "High" | "Medium" | "Low";
  technician: string;
  status: "Assigned" | "Work Started" | "Pending Parts" | "Completed";
}

const activeRequests: ServiceRequest[] = [
  { id: "AC-1024", resident: "Mr. Khanna", flatNo: "Penthouse P1", issue: "Compressor failure / No cooling", priority: "High", technician: "Rahul (Sr. Tech)", status: "Work Started" },
  { id: "AC-1025", resident: "Mrs. Sharma", flatNo: "Tower B-203", issue: "Routine Filter Cleaning", priority: "Low", technician: "Kiran (Junior)", status: "Assigned" },
];

export default function ACServicePage() {
  const columns: ColumnDef<ServiceRequest>[] = [
    {
      accessorKey: "resident",
      header: "Service Requester",
      cell: ({ row }) => (
        <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.resident}</span>
            <span className="text-[10px] text-muted-foreground font-bold uppercase">{row.original.flatNo}</span>
        </div>
      ),
    },
    {
      accessorKey: "issue",
      header: "Reported Complaint",
      cell: ({ row }) => <span className="text-xs font-medium text-muted-foreground truncate max-w-[200px]">{row.getValue("issue")}</span>,
    },
    {
      accessorKey: "priority",
      header: "Severity",
      cell: ({ row }) => (
        <Badge variant="outline" className={cn(
            "text-[10px] uppercase font-bold px-2 py-0.5",
            row.original.priority === "High" ? "bg-critical/5 text-critical border-critical/20" : "bg-info/5 text-info border-info/20"
        )}>
            {row.getValue("priority")}
        </Badge>
      ),
    },
    {
        accessorKey: "status",
        header: "Workflow Status",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
              <div className={cn(
                  "h-1.5 w-1.5 rounded-full animate-pulse",
                  row.getValue("status") === "Work Started" ? "bg-primary" : "bg-warning"
              )} />
              <span className="text-xs font-bold">{row.getValue("status")}</span>
          </div>
        ),
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
    <div className="animate-fade-in space-y-8 pb-10">
      <PageHeader
        title="Air Conditioner Services"
        description="Technical staff management, spare parts tracking, and maintenance workflow coordination."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" /> Schedule Visit
            </Button>
            <Button className="gap-2 shadow-lg shadow-primary/20">
               <Wrench className="h-4 w-4" /> New Job Order
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-4">
        {[
          { label: "Active Jobs", value: "14", sub: "Currently assigned", icon: Wind, color: "text-primary" },
          { label: "Spare Parts Low", value: "3", sub: "Reorder required", icon: Settings, color: "text-warning" },
          { label: "Avg Resolution", value: "3.2h", sub: "From log to fix", icon: Clock, color: "text-info" },
          { label: "Completed Hub", value: "156", sub: "Total this month", icon: CheckCircle2, color: "text-success" },
        ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
                <div className="flex items-center gap-4">
                    <div className={cn("h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center", stat.color)}>
                        <stat.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold ">{stat.value}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</span>
                    </div>
                </div>
            </Card>
        ))}
      </div>

      <Tabs defaultValue="workflow" className="w-full">
            <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-8">
                <TabsTrigger value="workflow" className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-widest">Active Workflow</TabsTrigger>
                <TabsTrigger value="staff" className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-widest">Technical Staff</TabsTrigger>
                <TabsTrigger value="inventory" className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-widest">Spare Inventory</TabsTrigger>
            </TabsList>
            
            <TabsContent value="workflow" className="pt-6">
                <DataTable columns={columns} data={activeRequests} searchKey="resident" />
            </TabsContent>

            <TabsContent value="staff" className="pt-6">
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        { name: "Rahul Deshmukh", role: "Sr. HVAC Engineer", skill: "Centralized Plant", cert: "HVAC Cert v2" },
                        { name: "Kiran Kumar", role: "AC Technician", skill: "Split/Window AC", cert: "Diploma MEP" },
                        { name: "Suresh P.", role: "Gas Charging Spec.", skill: "Refrigerants", cert: "Safety L3" },
                    ].map((staff, i) => (
                        <Card key={i} className="border-none shadow-card ring-1 ring-border">
                            <CardHeader className="p-4 pb-2">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-bold">RD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <CardTitle className="text-sm font-bold">{staff.name}</CardTitle>
                                        <CardDescription className="text-[10px]">{staff.role}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 space-y-3">
                                <div className="flex justify-between items-center text-[10px] pt-3 border-t uppercase font-bold tracking-widest text-muted-foreground">
                                    <span>Primary Skill</span>
                                    <span className="text-foreground">{staff.skill}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-[8px] bg-info/5 text-info border-info/20 font-bold uppercase">{staff.cert}</Badge>
                                    <Badge variant="outline" className="text-[8px] bg-success/5 text-success border-success/20 font-bold uppercase">Active</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="inventory" className="pt-6">
                <div className="p-20 text-center border-2 border-dashed rounded-2xl bg-muted/20">
                    <CardDescription>UI for tracking Gas (R32/R410), Capacitors, Pipes, and Controllers.</CardDescription>
                </div>
            </TabsContent>
      </Tabs>
    </div>
  );
}
