"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Flag, MoreHorizontal, Sun, Info } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Holiday {
  id: string;
  name: string;
  date: string;
  day: string;
  type: "National" | "Regional" | "Company Off";
  payrollImpact: "Public Holiday Pay" | "Standard Off";
}

const data: Holiday[] = [
  { id: "HOL-24-01", name: "Republic Day", date: "2024-01-26", day: "Friday", type: "National", payrollImpact: "Public Holiday Pay" },
  { id: "HOL-24-02", name: "Holi Festival", date: "2024-03-25", day: "Monday", type: "Regional", payrollImpact: "Standard Off" },
  { id: "HOL-24-03", name: "Independence Day", date: "2024-08-15", day: "Thursday", type: "National", payrollImpact: "Public Holiday Pay" },
  { id: "HOL-24-04", name: "Founder's Day", date: "2024-10-10", day: "Thursday", type: "Company Off", payrollImpact: "Standard Off" },
];

export default function HolidayCalendarPage() {
  const columns: ColumnDef<Holiday>[] = [
    {
      accessorKey: "name",
      header: "Holiday Instance",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
            <Flag className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.name}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Observed Date",
      cell: ({ row }) => (
        <div className="flex flex-col text-left">
            <span className="text-sm font-bold">{row.original.date}</span>
            <span className="text-[10px] text-muted-foreground font-medium">{row.original.day}</span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Classification",
      cell: ({ row }) => (
        <Badge variant="outline" className={cn(
            "text-[10px] uppercase font-bold px-2 py-0.5",
            row.original.type === "National" ? "bg-primary/5 text-primary border-primary/20" : "bg-muted/50 text-muted-foreground border-none"
        )}>
            {row.getValue("type")}
        </Badge>
      ),
    },
    {
      accessorKey: "payrollImpact",
      header: "Payroll Logic",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Info className="h-3.5 w-3.5 text-info" />
            <span className="text-xs font-bold text-muted-foreground">{row.getValue("payrollImpact")}</span>
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
        title="Holiday Master"
        description="Unified calendar of National and Regional holidays utilized for payroll and statutory pay calculations."
        actions={
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> Add Holiday
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Public Holidays", value: "14", sub: "National observance", icon: Flag, color: "text-primary" },
          { label: "Regional / Fest", value: "8", sub: "State-specific", icon: Sun, color: "text-warning" },
          { label: "Company Special", value: "2", sub: "Organization specific", icon: Calendar, color: "text-info" },
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
