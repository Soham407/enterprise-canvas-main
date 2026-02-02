"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardCheck, Settings, ShieldCheck, MoreHorizontal, HelpCircle, ListTodo } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChecklistMaster {
  id: string;
  department: string;
  checklistName: string;
  questionCount: number;
  triggerTime: string;
  status: "Active" | "Draft";
}

const data: ChecklistMaster[] = [
  { id: "M-CHK-01", department: "Security", checklistName: "Night Patrol Verification", questionCount: 12, triggerTime: "08:00 PM", status: "Active" },
  { id: "M-CHK-02", department: "Housekeeping", checklistName: "Daily Lobby Sanitation", questionCount: 8, triggerTime: "09:00 AM", status: "Active" },
  { id: "M-CHK-03", department: "Maintenance", checklistName: "Water Pump & Level Log", questionCount: 5, triggerTime: "07:00 AM", status: "Active" },
  { id: "M-CHK-04", department: "Security", checklistName: "Main Entrance Gate Check", questionCount: 15, triggerTime: "06:00 AM", status: "Draft" },
];

export default function ChecklistMasterPage() {
  const columns: ColumnDef<ChecklistMaster>[] = [
    {
      accessorKey: "checklistName",
      header: "Checklist Identifier",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
            <ClipboardCheck className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.checklistName}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "department",
      header: "Assigned Department",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-muted/30 border-none font-medium">
          {row.getValue("department")}
        </Badge>
      ),
    },
    {
      accessorKey: "questionCount",
      header: "Schema Length",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <HelpCircle className="h-3.5 w-3.5 text-info" />
            <span className="text-sm font-medium">{row.getValue("questionCount")} Questions</span>
        </div>
      ),
    },
    {
      accessorKey: "triggerTime",
      header: "Trigger Time",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-muted-foreground">
            <ListTodo className="h-3 w-3" /> {row.getValue("triggerTime")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Definition Status",
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
        title="Checklist Configuration"
        description="Define routine inspection points and Yes/No/Value questions for various departments."
        actions={
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> Create New Checklist
          </Button>
        }
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Active Forms", value: "24", sub: "Live in guard app", icon: ShieldCheck, color: "text-success" },
          { label: "Questions Defined", value: "182", sub: "Across all schemas", icon: HelpCircle, color: "text-info" },
          { label: "Pending Drafts", value: "3", sub: "Requiring review", icon: Settings, color: "text-warning" },
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

      <DataTable columns={columns} data={data} searchKey="checklistName" />
    </div>
  );
}
