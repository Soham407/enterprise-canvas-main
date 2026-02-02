"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Plus, 
  MapPin, 
  User, 
  ShieldAlert, 
  MoreHorizontal,
  Search,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EmergencyContact {
  id: string;
  name: string;
  category: "Police" | "Fire" | "Ambulance" | "Utility" | "Management";
  contactNo: string;
  secondaryNo?: string;
  address?: string;
}

const data: EmergencyContact[] = [
  { id: "EMG-01", name: "District Police Station", category: "Police", contactNo: "100", secondaryNo: "+91 22 2345 6789", address: "Sector 4, Main Road, Park View" },
  { id: "EMG-02", name: "City Fire Brigade", category: "Fire", contactNo: "101", secondaryNo: "+91 22 1122 3344", address: "Sector 12, Industrial Area" },
  { id: "EMG-03", name: "LifeCare Ambulance", category: "Ambulance", contactNo: "102", secondaryNo: "+91 99999 88888", address: "24/7 Mobile Unit" },
  { id: "EMG-04", name: "Society Electrician (On-Call)", category: "Utility", contactNo: "+91 88888 77777", address: "Basement Maintenance Hub" },
];

export default function EmergencyDirectoryPage() {
  const columns: ColumnDef<EmergencyContact>[] = [
    {
      accessorKey: "name",
      header: "Agency / Contact Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className={cn(
            "h-8 w-8 rounded-lg flex items-center justify-center",
            row.original.category === "Police" ? "bg-critical/5 text-critical" :
            row.original.category === "Fire" ? "bg-orange-500/5 text-orange-500" :
            row.original.category === "Ambulance" ? "bg-success/5 text-success" : "bg-primary/5 text-primary"
          )}>
            <Phone className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.name}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.category} • {row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "contactNo",
      header: "Primary Contact",
      cell: ({ row }) => <span className="text-sm font-bold text-foreground">{row.getValue("contactNo")}</span>,
    },
    {
      accessorKey: "secondaryNo",
      header: "Alternate Number",
      cell: ({ row }) => <span className="text-xs font-medium text-muted-foreground">{row.getValue("secondaryNo") || "-"}</span>,
    },
    {
      accessorKey: "address",
      header: "Physical Address",
      cell: ({ row }) => <span className="text-xs text-muted-foreground truncate max-w-[200px]">{row.getValue("address")}</span>,
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-2 border-primary/20 hover:bg-primary/5 text-primary">
                Call Now
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <PageHeader
        title="Emergency Directory"
        description="Consolidated quick-dial list for local authorities, healthcare, and critical utility support."
        actions={
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> Add Emergency Contact
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Public Police", color: "bg-critical", icon: ShieldAlert },
          { label: "Fire Services", color: "bg-orange-500", icon: ShieldAlert },
          { label: "Emergency Med", color: "bg-success", icon: ShieldAlert },
          { label: "Local Utilities", color: "bg-info", icon: ShieldAlert },
        ].map((card, i) => (
            <Card key={i} className="border-none shadow-card ring-1 ring-border p-4 hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center justify-between">
                     <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-lg", card.color)}>
                        <card.icon className="h-5 w-5" />
                     </div>
                     <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <div className="mt-4 flex flex-col items-start">
                    <span className="text-sm font-bold ">{card.label}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-0.5">Quick Dial</span>
                </div>
            </Card>
        ))}
      </div>

      <div className="flex items-center gap-4 py-2">
          <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search services..." className="pl-10 h-10 border-none shadow-premium ring-1 ring-border focus-visible:ring-primary/20" />
          </div>
          <div className="flex gap-2">
              <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted border-none bg-muted/50 font-bold">All</Badge>
              <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted border-none font-bold">Healthcare</Badge>
              <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted border-none font-bold">Government</Badge>
          </div>
      </div>

      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
}
