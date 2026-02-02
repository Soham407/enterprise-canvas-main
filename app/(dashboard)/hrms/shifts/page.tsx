"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Users, Calendar, MoreHorizontal, Settings2, ShieldCheck } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  duration: string;
  assignedPersonnel: number;
  status: "Active" | "Inactive";
  type: "Regular" | "Rotational" | "Night";
}

const data: Shift[] = [
  { id: "SHFT-01", name: "Morning Security", startTime: "08:00 AM", endTime: "08:00 PM", duration: "12 Hours", assignedPersonnel: 42, status: "Active", type: "Regular" },
  { id: "SHFT-02", name: "Night Security", startTime: "08:00 PM", endTime: "08:00 AM", duration: "12 Hours", assignedPersonnel: 38, status: "Active", type: "Night" },
  { id: "SHFT-03", name: "General Admin", startTime: "09:00 AM", endTime: "06:00 PM", duration: "9 Hours", assignedPersonnel: 15, status: "Active", type: "Regular" },
  { id: "SHFT-04", name: "Facility Maintenance", startTime: "10:00 AM", endTime: "07:00 PM", duration: "9 Hours", assignedPersonnel: 12, status: "Active", type: "Rotational" },
];

export default function ShiftMasterPage() {
  const columns: ColumnDef<Shift>[] = [
    {
      accessorKey: "name",
      header: "Shift Identity",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Clock className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.name}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "timings",
      header: "Shift Timings",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px] font-bold bg-muted/50 border-none">
                {row.original.startTime}
            </Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="outline" className="font-mono text-[10px] font-bold bg-muted/50 border-none">
                {row.original.endTime}
            </Badge>
        </div>
      ),
    },
    {
      accessorKey: "duration",
      header: "Total Duration",
      cell: ({ row }) => <span className="text-xs font-bold text-muted-foreground">{row.getValue("duration")}</span>,
    },
    {
      accessorKey: "type",
      header: "Shift Logic",
      cell: ({ row }) => (
        <Badge variant="outline" className={cn(
            "text-[10px] uppercase font-bold px-2 py-0.5",
            row.original.type === "Night" ? "bg-critical/5 text-critical border-critical/20" : "bg-info/5 text-info border-info/20"
        )}>
            {row.getValue("type")}
        </Badge>
      ),
    },
    {
      accessorKey: "assignedPersonnel",
      header: "Strength",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm font-bold">{row.getValue("assignedPersonnel")}</span>
        </div>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                <Settings2 className="h-4 w-4" />
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
        title="Shift Master"
        description="Define and manage operational shift timings, rotations, and personnel deployment strength."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <Calendar className="h-4 w-4" /> Roster View
            </Button>
            <Button className="gap-2 shadow-sm">
               <Plus className="h-4 w-4" /> Create Shift
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Active Shifts", value: "4", icon: Clock, color: "text-primary" },
          { label: "Total Assigned", value: "107", icon: Users, color: "text-info" },
          { label: "Night Shift Avg", value: "38", icon: ShieldCheck, color: "text-critical" },
          { label: "Peak Coverage", value: "92%", icon: Calendar, color: "text-success" },
        ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
                <div className="flex items-center gap-4">
                    <div className={cn("h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center", stat.color)}>
                        <stat.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-2xl font-bold ">{stat.value}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</span>
                    </div>
                </div>
            </Card>
        ))}
      </div>

      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
}
