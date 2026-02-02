"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  BarChart3, 
  Calendar, 
  Download, 
  Filter, 
  MoreHorizontal, 
  Users, 
  Clock, 
  TrendingUp,
  FileText
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AttendanceReport {
  id: string;
  department: string;
  totalPresent: number;
  totalAbsent: number;
  onTimeRate: string;
  avgLateMins: string;
}

const data: AttendanceReport[] = [
  { id: "REP-A1", department: "Security", totalPresent: 42, totalAbsent: 2, onTimeRate: "94%", avgLateMins: "1.2m" },
  { id: "REP-A2", department: "Housekeeping", totalPresent: 18, totalAbsent: 4, onTimeRate: "82%", avgLateMins: "8.5m" },
  { id: "REP-A3", department: "Administration", totalPresent: 12, totalAbsent: 0, onTimeRate: "100%", avgLateMins: "0m" },
  { id: "REP-A4", department: "Pantry", totalPresent: 8, totalAbsent: 1, onTimeRate: "88%", avgLateMins: "4.2m" },
];

export default function AttendanceAnalysisPage() {
  const columns: ColumnDef<AttendanceReport>[] = [
    {
      accessorKey: "department",
      header: "Department Cluster",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <span className="font-bold text-sm ">{row.original.department}</span>
        </div>
      ),
    },
    {
      accessorKey: "attendance",
      header: "Present vs Absent",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
            <div className="flex flex-col">
                <span className="text-xs font-bold text-success">{row.original.totalPresent} In</span>
                <span className="text-[10px] text-muted-foreground">Force</span>
            </div>
            <div className="h-4 w-[1px] bg-border" />
            <div className="flex flex-col">
                <span className="text-xs font-bold text-critical">{row.original.totalAbsent} Out</span>
                <span className="text-[10px] text-muted-foreground">Deficit</span>
            </div>
        </div>
      ),
    },
    {
      accessorKey: "onTimeRate",
      header: "Punctuality",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-info/5 text-info border-info/20 font-bold">{row.getValue("onTimeRate")}</Badge>
            <span className="text-[10px] font-bold text-muted-foreground">On Time</span>
        </div>
      ),
    },
    {
      accessorKey: "avgLateMins",
      header: "Avg Delay",
      cell: ({ row }) => <span className="text-xs font-medium text-muted-foreground">{row.getValue("avgLateMins")} late</span>,
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
        title="Attendance Performance Analysis"
        description="Comprehensive reporting on staff punctuality, absences, and peak-hour availability across departments."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <Calendar className="h-4 w-4" /> Date Range
            </Button>
            <Button className="gap-2 shadow-lg shadow-primary/20">
               <Download className="h-4 w-4" /> Export Report
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Overall Attendance", value: "91% ", icon: TrendingUp, color: "text-success", sub: "+2% from last week" },
          { label: "Critical Absences", value: "4", icon: Users, color: "text-critical", sub: "Priority Replacements" },
          { label: "Avg Shift Depth", value: "8.2h", icon: Clock, color: "text-info", sub: "Standard 8h target" },
          { label: "Delayed Checkins", value: "12", icon: BarChart3, color: "text-warning", sub: "Next 24 hours" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
               <div className="flex flex-col gap-3 text-left">
                    <div className="flex items-center justify-between">
                        <div className={cn("h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center", stat.color)}>
                            <stat.icon className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</span>
                    </div>
                    <div>
                        <span className="text-xl font-bold ">{stat.value}</span>
                        <div className="flex items-center mt-1 text-[10px] font-medium text-muted-foreground">
                            {stat.sub}
                        </div>
                    </div>
                </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-none shadow-card ring-1 ring-border">
              <CardHeader>
                  <CardTitle className="text-sm font-bold">Attendance Heatmap</CardTitle>
                  <CardDescription className="text-[10px]">Staff density across 24 hours.</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center bg-muted/20 border-t border-dashed rounded-b-xl">
                    <span className="text-xs font-medium text-muted-foreground">Visual analytics rendering engine...</span>
              </CardContent>
          </Card>
          <Card className="border-none shadow-card ring-1 ring-border">
              <CardHeader>
                  <CardTitle className="text-sm font-bold">Late Entry Drivers</CardTitle>
                  <CardDescription className="text-[10px]">Top reasons for punctuality breach.</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center bg-muted/20 border-t border-dashed rounded-b-xl">
                    <span className="text-xs font-medium text-muted-foreground">Reason category distribution...</span>
              </CardContent>
          </Card>
      </div>

      <DataTable columns={columns} data={data} searchKey="department" />
    </div>
  );
}
