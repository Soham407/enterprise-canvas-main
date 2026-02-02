"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Bell, MapPin, Clock, Users, MoreHorizontal, Megaphone, CalendarCheck } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CompanyEvent {
  id: string;
  title: string;
  category: "Meeting" | "Training" | "Emergency Drill" | "Social";
  date: string;
  time: string;
  venue: string;
  attendees: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

const data: CompanyEvent[] = [
  { id: "EVT-801", title: "Quarterly Society AGM", category: "Meeting", date: "2024-02-15", time: "06:00 PM", venue: "Main Clubhouse", attendees: "All Residents", status: "Scheduled" },
  { id: "EVT-802", title: "Fire Safety Drill", category: "Emergency Drill", date: "2024-02-20", time: "11:00 AM", venue: "Towers A, B, C", attendees: "All Staff", status: "Scheduled" },
  { id: "EVT-803", title: "Security Protocols Refresh", category: "Training", date: "2024-02-01", time: "02:00 PM", venue: "Conference Room", attendees: "Security Personnel", status: "Completed" },
  { id: "EVT-804", title: "Monthly Staff Welfare", category: "Social", date: "2024-02-28", time: "04:00 PM", venue: "Cafeteria", attendees: "Management & Staff", status: "Scheduled" },
];

export default function CompanyEventsPage() {
  const columns: ColumnDef<CompanyEvent>[] = [
    {
      accessorKey: "title",
      header: "Event Title",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-info/5 flex items-center justify-center text-info">
            <Megaphone className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.title}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Event Type",
      cell: ({ row }) => (
        <Badge variant="secondary" className="bg-muted/50 border-none font-medium text-xs font-bold text-muted-foreground/80 lowercase italic capitalize">
            {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "schedule",
      header: "Timeline",
      cell: ({ row }) => (
        <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold">
                <CalendarCheck className="h-3 w-3 text-primary" /> {row.original.date}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                <Clock className="h-2.5 w-2.5" /> {row.original.time}
            </div>
        </div>
      ),
    },
    {
      accessorKey: "venue",
      header: "Venue / Site",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <MapPin className="h-3 w-3 text-critical/50" /> {row.getValue("venue")}
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
                  val === "Scheduled" ? "bg-primary/10 text-primary border-primary/20" :
                  val === "Completed" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground border-none"
              )}>
                  {val}
              </Badge>
            );
        },
      },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                <Bell className="h-4 w-4" />
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
        title="Company Events"
        description="Unified scheduling and notification hub for society meetings, critical drills, and training sessions."
        actions={
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> Schedule Event
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Upcoming", value: "8", icon: CalendarCheck, color: "text-primary" },
          { label: "Drills Today", value: "1", icon: Megaphone, color: "text-critical" },
          { label: "Participants", value: "450", icon: Users, color: "text-info" },
          { label: "Notifications", value: "1.2k", icon: Bell, color: "text-warning" },
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

      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
}
