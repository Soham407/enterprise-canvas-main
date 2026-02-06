"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  CheckCircle2, 
  Lightbulb, 
  Droplet, 
  Lock, 
  Image as ImageIcon,
  MoreHorizontal,
  Calendar,
  Filter,
  ArrowUpRight
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  task: string;
  category: "Security" | "Utilities" | "Facilities";
  assignedTo: string;
  scheduledTime: string;
  completedAt?: string;
  status: "Completed" | "Pending" | "Missed";
  hasEvidence: boolean;
}

const data: ChecklistItem[] = [
  { id: "CHK-001", task: "Parking Lights: ON Check", category: "Utilities", assignedTo: "Night Shift Guard", scheduledTime: "06:30 PM", completedAt: "06:35 PM", status: "Completed", hasEvidence: true },
  { id: "CHK-002", task: "Water Level Log: Main Tank", category: "Utilities", assignedTo: "Day Shift Guard", scheduledTime: "09:00 AM", completedAt: "09:12 AM", status: "Completed", hasEvidence: false },
  { id: "CHK-003", task: "Basement Shutter Lock Verification", category: "Security", assignedTo: "Patrol Officer", scheduledTime: "11:00 PM", status: "Pending", hasEvidence: false },
  { id: "CHK-004", task: "Fire Exit Clearance Check", category: "Facilities", assignedTo: "Safety Supervisor", scheduledTime: "10:00 AM", status: "Missed", hasEvidence: false },
];

export default function ChecklistsPage() {
  const columns: ColumnDef<ChecklistItem>[] = [
    {
      accessorKey: "task",
      header: "Operational Task",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className={cn(
            "h-8 w-8 rounded-lg flex items-center justify-center",
            row.original.category === "Security" ? "bg-primary/5 text-primary" :
            row.original.category === "Utilities" ? "bg-warning/5 text-warning" : "bg-info/5 text-info"
          )}>
            {row.original.category === "Security" ? <Lock className="h-4 w-4" /> :
             row.original.category === "Utilities" ? <Droplet className="h-4 w-4" /> : <ClipboardList className="h-4 w-4" />}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm ">{row.original.task}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.category} • {row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "assignedTo",
      header: "Designation",
      cell: ({ row }) => (
        <span className="text-xs font-medium text-muted-foreground">{row.getValue("assignedTo")}</span>
      ),
    },
    {
      accessorKey: "scheduledTime",
      header: "Schedule",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-bold">{row.getValue("scheduledTime")}</span>
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
            val === "Pending" ? "bg-warning/10 text-warning border-warning/20" : "bg-critical/10 text-critical border-critical/20"
          )}>
            {val}
          </Badge>
        );
      },
    },
    {
      accessorKey: "evidence",
      header: "Evidence",
      cell: ({ row }) => (
        row.original.hasEvidence ? (
            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-[10px] font-bold text-primary">
                <ImageIcon className="h-3 w-3" /> View Photo
            </Button>
        ) : <span className="text-[10px] text-muted-foreground italic pl-3">-</span>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Guard Notes</DropdownMenuItem>
            <DropdownMenuItem>Reschedule Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader
        title="Daily Operational Checklists"
        description="Monitor verification tasks, utility logs, and facility maintenance routines."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filter Logs
            </Button>
            <Button className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" /> Create Schema
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Completion Rate", value: "94%", detail: "Avg. last 7 days", progress: 94, color: "bg-success" },
          { label: "Pending Tasks", value: "12", detail: "Requiring attention", progress: 40, color: "bg-warning" },
          { label: "Critical Failure", value: "2", detail: "Alerts generated", progress: 15, color: "bg-critical" },
        ].map((kpi, i) => (
          <Card key={i} className="border-none shadow-card ring-1 ring-border p-5">
            <div className="flex flex-col gap-4">
               <div className="flex justify-between items-start">
                   <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{kpi.label}</span>
                        <span className="text-2xl font-bold ">{kpi.value}</span>
                   </div>
                   <div className="p-2 bg-muted/50 rounded-lg">
                       <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                   </div>
               </div>
               <div className="space-y-1.5">
                   <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                       <div className={cn("h-full rounded-full", kpi.color)} style={{ width: `${kpi.progress}%` }} />
                   </div>
                   <span className="text-[10px] font-medium text-muted-foreground">{kpi.detail}</span>
               </div>
            </div>
          </Card>
        ))}
      </div>

      <DataTable columns={columns} data={data} searchKey="task" />
    </div>
  );
}

// Add missing dropdown imports
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
