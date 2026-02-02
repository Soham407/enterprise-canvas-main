"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, LayoutTemplate, BriefcaseIcon, Link2, MoreHorizontal, Subtitles, ListTodo } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceMapping {
  id: string;
  serviceCategory: string;
  mappedTasks: string[];
  totalTasks: number;
}

const data: ServiceMapping[] = [
  { id: "SM-101", serviceCategory: "Air Conditioner Services", mappedTasks: ["Filter Cleaning", "Gas Top-up", "Coil Wash", "Thermostat Reset"], totalTasks: 12 },
  { id: "SM-102", serviceCategory: "Pest Control Services", mappedTasks: ["Fogging", "Gel Application", "Spray Treatment", "Rodent Bating"], totalTasks: 8 },
  { id: "SM-103", serviceCategory: "Plantation Services", mappedTasks: ["Lawn Mowing", "Soil Turning", "Pruning", "De-weeding"], totalTasks: 15 },
  { id: "SM-104", serviceCategory: "Cleaning Services", mappedTasks: ["Floor Scrubbing", "Glass Cleaning", "Deep Sanitation"], totalTasks: 6 },
];

export default function ServiceTaskMappingPage() {
  const columns: ColumnDef<ServiceMapping>[] = [
    {
      accessorKey: "serviceCategory",
      header: "Service Cluster",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10">
            <LayoutTemplate className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.serviceCategory}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "mappedTasks",
      header: "Core Task Mapping",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1 max-w-[300px]">
            {row.original.mappedTasks.map(task => (
                <Badge key={task} variant="secondary" className="text-[10px] font-bold px-1.5 py-0 h-4 bg-muted/50 border-none">
                    {task}
                </Badge>
            ))}
            {row.original.totalTasks > row.original.mappedTasks.length && (
                <span className="text-[10px] font-bold text-muted-foreground ml-1">+{row.original.totalTasks - row.original.mappedTasks.length} More</span>
            )}
        </div>
      ),
    },
    {
      accessorKey: "totalTasks",
      header: "Schema Depth",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <ListTodo className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm font-medium">{row.getValue("totalTasks")} Work Items</span>
        </div>
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
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Service Wise Work Master"
        description="Categorize specific Work items into broader Service clusters for streamlined reporting and job assignment."
        actions={
          <Button className="gap-2 shadow-sm">
            <Link2 className="h-4 w-4" /> Map Jobs
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Mapped Services", value: "18", icon: Subtitles, sub: "High-level clusters" },
          { label: "Total Assignments", value: "142", icon: BriefcaseIcon, sub: "Linked work items" },
          { label: "Uncategorized", value: "12", icon: ListTodo, sub: "Pending mapping" },
        ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center text-primary">
                        <stat.icon className="h-4 w-4" />
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

      <DataTable columns={columns} data={data} searchKey="serviceCategory" />
    </div>
  );
}
