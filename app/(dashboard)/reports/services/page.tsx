"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  TrendingUp, 
  Clock, 
  UserCheck, 
  MoreHorizontal, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2,
  Zap,
  Star,
  Download
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ServiceReport {
  id: string;
  category: string;
  totalJobs: number;
  avgResponse: string;
  resolutionRate: string;
  techEfficiency: string;
}

const data: ServiceReport[] = [
  { id: "S-REP-01", category: "AC Maintenance", totalJobs: 142, avgResponse: "3.2h", resolutionRate: "92%", techEfficiency: "88%" },
  { id: "S-REP-02", category: "Pest Control", totalJobs: 85, avgResponse: "6.5h", resolutionRate: "100%", techEfficiency: "94%" },
  { id: "S-REP-03", category: "Housekeeping", totalJobs: 320, avgResponse: "0.5h", resolutionRate: "98%", techEfficiency: "82%" },
  { id: "S-REP-04", category: "Security Drills", totalJobs: 12, avgResponse: "N/A", resolutionRate: "100%", techEfficiency: "96%" },
];

export default function ServicePerformancePage() {
  const columns: ColumnDef<ServiceReport>[] = [
    {
      accessorKey: "category",
      header: "Service Line",
      cell: ({ row }) => <span className="text-sm font-bold text-foreground">{row.getValue("category")}</span>,
    },
    {
      accessorKey: "totalJobs",
      header: "Total Job Orders",
      cell: ({ row }) => <span className="text-sm font-medium">{row.getValue("totalJobs")}</span>,
    },
    {
      accessorKey: "avgResponse",
      header: "Avg Response (TAT)",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-bold">{row.getValue("avgResponse")}</span>
        </div>
      ),
    },
    {
      accessorKey: "resolutionRate",
      header: "Resolution %",
      cell: ({ row }) => (
        <div className="w-[80px]">
            <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold">{row.original.resolutionRate}</span>
            </div>
            <Progress value={parseInt(row.original.resolutionRate)} className="h-1 bg-muted" />
        </div>
      ),
    },
    {
        accessorKey: "techEfficiency",
        header: "SLA Compliance",
        cell: ({ row }) => (
          <Badge variant="outline" className="bg-success/5 text-success border-success/20 font-bold">
              {row.getValue("techEfficiency")}
          </Badge>
        ),
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
    <div className="animate-fade-in space-y-8 pb-20">
      <PageHeader
        title="Service Excellence Analytics"
        description="Monitor technical service benchmarks, average response times (TAT), and technician efficiency across multi-vendor operations."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <Zap className="h-4 w-4" /> Real-time SLA
            </Button>
            <Button className="gap-2 shadow-sm">
               <Download className="h-4 w-4" /> Export Analytics
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Avg Resolution", value: "2.8h", icon: Clock, color: "text-primary", sub: "Global TAT" },
          { label: "SLA Breaches", value: "3", icon: Zap, color: "text-critical", sub: "Needs urgent check" },
          { label: "Satisfaction", value: "4.8", icon: Star, color: "text-warning", sub: "Based on 142 audits" },
          { label: "Active Jobs", value: "14", icon: UserCheck, color: "text-info", sub: "Currently assigned" },
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

      <DataTable columns={columns} data={data} searchKey="category" />
    </div>
  );
}
