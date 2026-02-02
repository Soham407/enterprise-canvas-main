"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Settings2, 
  Calendar, 
  Plus, 
  Clock, 
  MoreHorizontal, 
  ShieldCheck, 
  History,
  FileCheck,
  Settings
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LeaveType {
  id: string;
  name: string;
  quota: string;
  accrual: string;
  carryForward: string;
  status: "Active" | "Draft";
}

const data: LeaveType[] = [
  { id: "LV-C1", name: "Privilege Leave (PL)", quota: "18 Days", accrual: "1.5/mo", carryForward: "Max 45 Days", status: "Active" },
  { id: "LV-C2", name: "Sick Leave (SL)", quota: "12 Days", accrual: "1.0/mo", carryForward: "Max 24 Days", status: "Active" },
  { id: "LV-C3", name: "Casual Leave (CL)", quota: "8 Days", accrual: "Front-loaded", carryForward: "Expired Annually", status: "Active" },
  { id: "LV-C4", name: "Maternity Leave", quota: "182 Days", accrual: "Event-based", carryForward: "N/A", status: "Active" },
];

export default function LeaveConfigPage() {
  const columns: ColumnDef<LeaveType>[] = [
    {
      accessorKey: "name",
      header: "Leave Category",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
            <Calendar className="h-4 w-4" />
          </div>
          <span className="font-bold text-sm ">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "quota",
      header: "Annual Entitlement",
      cell: ({ row }) => <span className="text-sm font-bold text-foreground">{row.getValue("quota")}</span>,
    },
    {
      accessorKey: "accrual",
      header: "Accrual Logic",
      cell: ({ row }) => <span className="text-xs font-medium text-muted-foreground">{row.getValue("accrual")}</span>,
    },
    {
      accessorKey: "carryForward",
      header: "Rollover Policy",
      cell: ({ row }) => <span className="text-xs font-medium text-muted-foreground">{row.getValue("carryForward")}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className={cn("font-bold text-[10px] uppercase h-5", row.getValue("status") === "Active" ? "bg-success/10 text-success border-success/20" : "")}>
            {row.getValue("status")}
        </Badge>
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
        title="Leave Configuration"
        description="Define statutory leave types, accrual logic, and carry-forward rules for payroll integration."
        actions={
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> Define Leave Type
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Active Policies", value: "6", icon: ShieldCheck, color: "text-success" },
          { label: "Draft Configs", value: "2", icon: Settings, color: "text-warning" },
          { label: "Revision Hist.", value: "12", icon: History, color: "text-info" },
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
