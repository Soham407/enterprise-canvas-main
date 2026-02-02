"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Banknote, History, ArrowUpRight, ArrowDownRight, MoreHorizontal, FileCheck } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SupplierRate {
  id: string;
  product: string;
  vendor: string;
  purchaseRate: string;
  unit: string;
  lastRevised: string;
  trend: "Up" | "Down" | "Stable";
}

const data: SupplierRate[] = [
  { id: "RT-001", product: "High-Res IP Camera", vendor: "Global Security Supplies", purchaseRate: "₹12,500", unit: "Per Piece", lastRevised: "2024-01-15", trend: "Stable" },
  { id: "RT-002", product: "Mineral Water (20L)", vendor: "Refresh Beverage Corp", purchaseRate: "₹85", unit: "Per Jar", lastRevised: "2024-02-01", trend: "Up" },
  { id: "RT-003", product: "Floor Cleaner (5L)", vendor: "CleanPro Industrial", purchaseRate: "₹450", unit: "Per Crate", lastRevised: "2024-01-20", trend: "Down" },
  { id: "RT-004", product: "Safety Vests (L)", vendor: "Global Security Supplies", purchaseRate: "₹650", unit: "Per Piece", lastRevised: "2023-12-10", trend: "Stable" },
];

export default function SupplierRatesPage() {
  const columns: ColumnDef<SupplierRate>[] = [
    {
      accessorKey: "product",
      header: "Product Detail",
      cell: ({ row }) => (
        <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.product}</span>
            <span className="text-[10px] text-muted-foreground font-bold uppercase ">{row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: "vendor",
      header: "Contracted Vendor",
      cell: ({ row }) => <span className="text-sm font-medium text-foreground/80">{row.getValue("vendor")}</span>,
    },
    {
      accessorKey: "purchaseRate",
      header: "Contract Rate",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Banknote className="h-3.5 w-3.5 text-success/50" />
            <span className="text-sm font-bold text-primary">{row.getValue("purchaseRate")}</span>
            <span className="text-[10px] text-muted-foreground font-medium">/ {row.original.unit}</span>
        </div>
      ),
    },
    {
      accessorKey: "trend",
      header: "Market Trend",
      cell: ({ row }) => {
          const val = row.getValue("trend") as string;
          return (
            <div className="flex items-center gap-1.5">
                {val === "Up" ? <ArrowUpRight className="h-3.5 w-3.5 text-critical" /> :
                 val === "Down" ? <ArrowDownRight className="h-3.5 w-3.5 text-success" /> :
                 <div className="h-0.5 w-3 bg-muted-foreground/30" />}
                <span className="text-xs font-bold text-muted-foreground">{val}</span>
            </div>
          );
      },
    },
    {
      accessorKey: "lastRevised",
      header: "Revision Date",
      cell: ({ row }) => <span className="text-xs font-medium text-muted-foreground">{row.getValue("lastRevised")}</span>,
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                <History className="h-4 w-4" />
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
        title="Purchase Rate Repository"
        description="Negotiated procurement costs and long-term contracts for each product per supplier."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <History className="h-4 w-4" /> Price Audit
            </Button>
            <Button className="gap-2 shadow-sm">
               <Plus className="h-4 w-4" /> Update Rates
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Active Rates", value: "482", icon: FileCheck, color: "text-primary" },
          { label: "Price Surges", value: "12", icon: ArrowUpRight, color: "text-critical" },
          { label: "Cost Savings", value: "₹42k", icon: ArrowDownRight, color: "text-success" },
          { label: "Pending Revision", value: "5", icon: History, color: "text-warning" },
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

      <DataTable columns={columns} data={data} searchKey="product" />
    </div>
  );
}
