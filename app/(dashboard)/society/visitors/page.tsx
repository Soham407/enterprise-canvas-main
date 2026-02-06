"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  UserPlus, 
  History, 
  Phone, 
  Car, 
  MoreHorizontal, 
  DoorOpen, 
  Clock,
  CheckCircle2,
  XCircle,
  Search, 
  Filter, 
  Download, 
  FileText, 
  Package, 
  User, 
  Building, 
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Visitor {
  id: string;
  name: string;
  phone: string;
  flatNo: string;
  purpose: string;
  vehicleNo: string;
  checkIn: string;
  checkOut?: string;
  status: "In Building" | "Completed" | "Denied";
  type: "Guest" | "Daily Staff" | "Delivery";
}

const activeVisitors: Visitor[] = [
  { id: "VST-101", name: "David Miller", phone: "+91 98765 43210", flatNo: "Tower B-402", purpose: "Guest Visit", vehicleNo: "MH-12-AB-1234", checkIn: "10:15 AM", status: "In Building", type: "Guest" },
  { id: "VST-102", name: "Sarah (Maid)", phone: "+91 99887 76655", flatNo: "Tower A-102", purpose: "Daily Work", vehicleNo: "None", checkIn: "08:30 AM", status: "In Building", type: "Daily Staff" },
  { id: "VST-103", name: "Amazon Delivery", phone: "+91 88776 65544", flatNo: "Tower C-901", purpose: "Package", vehicleNo: "MH-12-XY-9000", checkIn: "11:05 AM", status: "In Building", type: "Delivery" },
];

export default function VisitorManagementPage() {
  const columns: ColumnDef<Visitor>[] = [
    {
      accessorKey: "name",
      header: "Visitor Details",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border shadow-sm">
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">{row.original.name.substring(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-sm ">{row.original.name}</span>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase ">
                <Badge variant="outline" className="h-4 px-1 py-0 text-[8px] border-primary/20 bg-primary/5 text-primary">{row.original.type}</Badge>
                <span>{row.original.id}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "flatNo",
      header: "Destination",
      cell: ({ row }) => (
        <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground/90">{row.original.flatNo}</span>
            <span className="text-[10px] text-muted-foreground font-medium">{row.original.purpose}</span>
        </div>
      ),
    },
    {
      accessorKey: "vehicleNo",
      header: "Vehicle",
      cell: ({ row }) => (
          row.original.vehicleNo === "None" ? 
          <span className="text-xs text-muted-foreground italic">Walk-in</span> :
          <div className="flex items-center gap-2">
              <Car className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-mono font-bold bg-muted px-1.5 py-1 rounded">{row.original.vehicleNo}</span>
          </div>
      ),
    },
    {
      accessorKey: "checkIn",
      header: "Entry Time",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium">{row.getValue("checkIn")}</span>
        </div>
      ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 animate-pulse-soft">
            ● {row.getValue("status")}
          </Badge>
        ),
      },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-1">
            <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs text-primary border-primary/20 hover:bg-primary/5">
                <DoorOpen className="h-3.5 w-3.5" /> Out
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader
        title="Visitor Management"
        description="Monitor real-time visitor movement and guest credentials for the society."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <History className="h-4 w-4" /> Movement Logs
            </Button>
            <Button className="gap-2 shadow-lg shadow-primary/20">
              <UserPlus className="h-4 w-4" /> Quick Entry
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Active Visitors", value: "24", sub: "Currently in building", icon: DoorOpen, color: "text-primary" },
          { label: "TodayTotal", value: "142", sub: "Entries since midnight", icon: History, color: "text-info" },
          { label: "Pre-Approved", value: "18", sub: "Scheduled for today", icon: CheckCircle2, color: "text-success" },
          { label: "Denied Entry", value: "3", sub: "Security alerts triggered", icon: XCircle, color: "text-critical" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-card ring-1 ring-border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={cn("h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold ">{stat.value}</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-8">
            <TabsTrigger value="active" className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-widest">In the Building</TabsTrigger>
            <TabsTrigger value="daily" className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-widest">Daily Helpers</TabsTrigger>
            <TabsTrigger value="residents" className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-widest">Family Directory</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="pt-6">
            <DataTable columns={columns} data={activeVisitors} searchKey="name" />
        </TabsContent>
        <TabsContent value="daily" className="pt-6">
            <div className="p-20 text-center border-2 border-dashed rounded-2xl bg-muted/20">
                <CardDescription>UI for Daily Servants, Drivers, and Maintenance Staff will render here.</CardDescription>
            </div>
        </TabsContent>
        <TabsContent value="residents" className="pt-6">
            <div className="p-20 text-center border-2 border-dashed rounded-2xl bg-muted/20">
                <CardDescription>Society Family Database for guard-side verification.</CardDescription>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
