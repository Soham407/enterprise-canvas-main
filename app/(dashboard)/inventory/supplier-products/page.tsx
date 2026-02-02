"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Package, Link2, MoreHorizontal, ArrowRightLeft, ShieldCheck } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SupplierMapping {
  id: string;
  vendor: string;
  product: string;
  productCode: string;
  category: string;
  leadTime: string;
  status: "Preferred" | "Alternative" | "Probation";
}

const data: SupplierMapping[] = [
  { id: "MAP-001", vendor: "Global Security Supplies", product: "High-Res IP Camera", productCode: "SEC-IPC-001", category: "Security Equipment", leadTime: "3-5 Days", status: "Preferred" },
  { id: "MAP-002", vendor: "Global Security Supplies", product: "Metal Detector (Handheld)", productCode: "SEC-MD-004", category: "Security Equipment", leadTime: "2 Days", status: "Preferred" },
  { id: "MAP-003", vendor: "Refresh Beverage Corp", product: "Mineral Water (20L)", productCode: "PTRY-WAT-20", category: "Pantry Supplies", leadTime: "Daily", status: "Preferred" },
  { id: "MAP-004", vendor: "CleanPro Industrial", product: "Floor Cleaner (5L)", productCode: "CLN-DET-002", category: "Cleaning Materials", leadTime: "1 Week", status: "Alternative" },
];

export default function SupplierProductsPage() {
  const columns: ColumnDef<SupplierMapping>[] = [
    {
      accessorKey: "vendor",
      header: "Active Supplier",
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
        accessorKey: "product",
        header: "Mapped Product",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="h-3.5 w-3.5 text-muted-foreground mr-2" />
            <div className="flex flex-col text-left">
                <span className="font-bold text-sm ">{row.original.product}</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.productCode}</span>
            </div>
          </div>
        ),
      },
    {
      accessorKey: "leadTime",
      header: "Delivery ETA",
      cell: ({ row }) => <span className="text-xs font-medium">{row.getValue("leadTime")}</span>,
    },
    {
      accessorKey: "status",
      header: "Vendor Status",
      cell: ({ row }) => {
          const val = row.getValue("status") as string;
          return (
            <Badge variant="outline" className={cn(
                "font-bold text-[10px] uppercase h-5",
                val === "Preferred" ? "bg-success/10 text-success border-success/20" :
                val === "Alternative" ? "bg-info/10 text-info border-info/20" : "bg-warning/10 text-warning border-warning/20"
            )}>
                {val}
            </Badge>
          );
      },
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
        title="Supplier Wise Products"
        description="Linking Product Master entries to specific authorized vendors for automated indenting."
        actions={
          <Button className="gap-2 shadow-sm">
            <Link2 className="h-4 w-4" /> New Mapping
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Mapped Products", value: "256", icon: ShieldCheck, sub: "Verified links" },
          { label: "Multi-Source", value: "42", icon: ArrowRightLeft, sub: "Fallback vendors" },
          { label: "Unmapped SKUs", value: "8", icon: Package, sub: "Pending setup" },
        ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center text-primary">
                        <stat.icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</span>
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-2xl font-bold ">{stat.value}</span>
                    <span className="text-[10px] font-medium text-muted-foreground mt-0.5">{stat.sub}</span>
                </div>
            </Card>
        ))}
      </div>

      <DataTable columns={columns} data={data} searchKey="product" />
    </div>
  );
}
