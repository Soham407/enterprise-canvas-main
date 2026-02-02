"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Wrench, Link2, MoreHorizontal, ShieldCheck, Tag } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VendorService {
  id: string;
  vendor: string;
  serviceCategory: string;
  authorizedRoles: string[];
  status: "Authorized" | "Flagged";
}

const data: VendorService[] = [
  { id: "VCM-01", vendor: "CoolAir HVAC Solutions", serviceCategory: "Air Conditioner Services", authorizedRoles: ["Technician", "Senior Engineer"], status: "Authorized" },
  { id: "VCM-02", vendor: "GreenThumb Landscapes", serviceCategory: "Plantation Services", authorizedRoles: ["Gardener", "Horticulturist"], status: "Authorized" },
  { id: "VCM-03", vendor: "PestGuard India", serviceCategory: "Pest Control Services", authorizedRoles: ["Field Operator"], status: "Authorized" },
  { id: "VCM-04", vendor: "Safety Systems Co.", serviceCategory: "Security Equipment Services", authorizedRoles: ["Installer", "Repair Tech"], status: "Authorized" },
];

export default function VendorServiceMappingPage() {
  const columns: ColumnDef<VendorService>[] = [
    {
      accessorKey: "vendor",
      header: "Service Vendor",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <span className="font-bold text-sm ">{row.original.vendor}</span>
        </div>
      ),
    },
    {
      accessorKey: "serviceCategory",
      header: "Linked Service Category",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Wrench className="h-3.5 w-3.5 text-muted-foreground mr-2" />
            <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-bold text-[10px] uppercase">
                {row.getValue("serviceCategory")}
            </Badge>
        </div>
      ),
    },
    {
      accessorKey: "authorizedRoles",
      header: "Qualified Tech Roles",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
            {row.original.authorizedRoles.map(role => (
                <Badge key={role} variant="outline" className="text-[8px] font-bold py-0 h-4 border-muted-foreground/20">{role}</Badge>
            ))}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Auth Status",
      cell: ({ row }) => (
        <Badge variant="outline" className={cn("font-bold text-[10px] uppercase h-5", row.getValue("status") === "Authorized" ? "bg-success/10 text-success border-success/20" : "")}>
            {row.getValue("status")}
        </Badge>
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
        title="Vendor-Service Mapping"
        description="Establish direct links between service providers and the specific treatment/technical categories they are authorized to handle."
        actions={
          <Button className="gap-2 shadow-sm">
            <Link2 className="h-4 w-4" /> New Authorization
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Authorized Links", value: "32", icon: ShieldCheck, sub: "Verified integrations" },
          { label: "Service Domains", value: "12", icon: Tag, sub: "Across 5 departments" },
          { label: "Active Vendors", value: "15", icon: Building2, sub: "Managed outsourced accounts" },
        ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card ring-1 ring-border p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                    <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center text-primary">
                        <stat.icon className="h-4 w-4" />
                    </div>
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-2xl font-bold ">{stat.value}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-0.5">{stat.label}</span>
                    <span className="text-[10px] font-medium text-muted-foreground mt-1">{stat.sub}</span>
                </div>
            </Card>
        ))}
      </div>

      <DataTable columns={columns} data={data} searchKey="vendor" />
    </div>
  );
}
