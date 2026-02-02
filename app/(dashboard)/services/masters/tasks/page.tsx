"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, ListTodo, Wrench, Clock, MoreHorizontal, Settings, Activity } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface JobTask {
  id: string;
  taskTitle: string;
  category: string;
  estimatedDuration: string;
  priority: "High" | "Standard";
  status: "Active" | "Archived";
}

const data: JobTask[] = [
  { id: "JOB-001", taskTitle: "Filter Cleaning (Split AC)", category: "AC Maintenance", estimatedDuration: "45 Mins", priority: "Standard", status: "Active" },
  { id: "JOB-002", taskTitle: "Gas Top-up (Window AC)", category: "AC Maintenance", estimatedDuration: "60 Mins", priority: "High", status: "Active" },
  { id: "JOB-003", taskTitle: "Lawn Mowing (Clubhouse)", category: "Landscape", estimatedDuration: "120 Mins", priority: "Standard", status: "Active" },
  { id: "JOB-004", taskTitle: "Chemical Spraying (Drains)", category: "Pest Control", estimatedDuration: "30 Mins", priority: "High", status: "Active" },
  { id: "JOB-005", taskTitle: "Gel Application (Kitchen)", category: "Pest Control", estimatedDuration: "20 Mins", priority: "Standard", status: "Active" },
];

export default function WorkTasksPage() {
  const columns: ColumnDef<JobTask>[] = [
    {
      accessorKey: "taskTitle",
      header: "Operation / Job Type",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-info/5 flex items-center justify-center">
            <Activity className="h-4 w-4 text-info" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.taskTitle}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Service Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-muted/30 border-none font-medium text-xs">
          {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "estimatedDuration",
      header: "Standard TAT",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm font-medium">{row.getValue("estimatedDuration")}</span>
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Job Priority",
      cell: ({ row }) => (
        <Badge variant="outline" className={cn(
            "font-bold text-[10px] uppercase h-5 px-2",
            row.getValue("priority") === "High" ? "bg-critical/5 text-critical border-critical/20" : "bg-info/5 text-info border-info/20"
        )}>
            {row.getValue("priority")}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                <Settings className="h-4 w-4" />
             </Button>
             <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
             </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Work Master"
        description="Comprehensive library of all possible technical tasks and operational job types across the organization."
        actions={
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> Add Job Type
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Defined Jobs", value: "154", icon: ListTodo, sub: "Across all domains" },
          { label: "High Priority", value: "12", icon: Activity, sub: "Urgent response tasks" },
          { label: "Archived", value: "8", icon: Settings, sub: "Historical operations" },
        ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center text-primary">
                        <stat.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</span>
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-2xl font-bold ">{stat.value}</span>
                    <span className="text-[10px] font-medium text-muted-foreground mt-0.5">{stat.sub}</span>
                </div>
            </Card>
        ))}
      </div>

      <DataTable columns={columns} data={data} searchKey="taskTitle" />
    </div>
  );
}
