"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plus, 
  MoreHorizontal,
  Briefcase,
  User,
  Filter
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LeaveRequest {
  id: string;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "Approved" | "Pending" | "Rejected";
}

const data: LeaveRequest[] = [
  { id: "LR-001", employee: "David Miller", type: "Sick Leave", startDate: "2024-02-01", endDate: "2024-02-02", days: 2, reason: "Seasonal Fever", status: "Approved" },
  { id: "LR-002", employee: "Sarah Miller", type: "Casual Leave", startDate: "2024-02-05", endDate: "2024-02-05", days: 1, reason: "Family Event", status: "Pending" },
  { id: "LR-003", employee: "John Doe", type: "Paid Leave", startDate: "2024-02-10", endDate: "2024-02-15", days: 6, reason: "Vacation", status: "Pending" },
  { id: "LR-004", employee: "Alan Smith", type: "Sick Leave", startDate: "2024-01-20", endDate: "2024-01-21", days: 2, reason: "Medical Checkup", status: "Rejected" },
];

export default function LeaveManagementPage() {
  const columns: ColumnDef<LeaveRequest>[] = [
    {
      accessorKey: "employee",
      header: "Employee",
      cell: ({ row }) => (
        <div className="flex items-center gap-3 text-left">
          <Avatar className="h-9 w-9 border">
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">{row.original.employee.substring(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-sm ">{row.original.employee}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Leave Type",
      cell: ({ row }) => (
        <Badge variant="secondary" className="bg-muted/50 border-none font-medium text-[10px] uppercase">
          {row.getValue("type")}
        </Badge>
      ),
    },
    {
      accessorKey: "startDate",
      header: "Duration",
      cell: ({ row }) => (
        <div className="flex flex-col">
            <span className="text-xs font-bold">{row.original.startDate} to {row.original.endDate}</span>
            <span className="text-[10px] text-muted-foreground font-medium">{row.original.days} Days Total</span>
        </div>
      ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{row.getValue("reason")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
          const val = row.getValue("status") as string;
          const variants: Record<string, string> = {
              "Approved": "bg-success/10 text-success border-success/20",
              "Pending": "bg-warning/10 text-warning border-warning/20",
              "Rejected": "bg-critical/10 text-critical border-critical/20"
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
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            {row.original.status === "Pending" && (
                <>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-success hover:bg-success/5 border-success/20">
                        <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-critical hover:bg-critical/5 border-critical/20">
                        <XCircle className="h-4 w-4" />
                    </Button>
                </>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader
        title="Leave Management"
        description="Review and process personnel time-off requests, yearly quotas, and carry-forward rules."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filter Quota
            </Button>
            <Button className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" /> Add Configuration
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-premium bg-linear-to-br from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <Briefcase className="h-5 w-5" />
                    </div>
                    <Badge className="bg-white/20 hover:bg-white/30 border-none">Active Today</Badge>
                </div>
                <div className="flex flex-col">
                    <span className="text-3xl font-extrabold ">92%</span>
                    <span className="text-[10px] uppercase font-bold text-primary-foreground/70 tracking-widest mt-1">Personnel Availability</span>
                </div>
            </CardContent>
        </Card>
        
        <Card className="border-none shadow-card ring-1 ring-border p-6">
            <div className="flex items-center gap-4 mb-3">
                 <div className="h-10 w-10 rounded-xl bg-warning/5 text-warning flex items-center justify-center">
                    <Clock className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Pending Review</span>
                    <span className="text-2xl font-bold ">14 Requests</span>
                 </div>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium">8 Personnel seeking leave next week</p>
        </Card>

        <Card className="border-none shadow-card ring-1 ring-border p-6">
            <div className="flex items-center gap-4 mb-3">
                 <div className="h-10 w-10 rounded-xl bg-success/5 text-success flex items-center justify-center">
                    <User className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">On Paid Leave</span>
                    <span className="text-2xl font-bold ">6 Members</span>
                 </div>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium">Auto-synced with smart attendance</p>
        </Card>
      </div>

      <DataTable columns={columns} data={data} searchKey="employee" />
    </div>
  );
}
