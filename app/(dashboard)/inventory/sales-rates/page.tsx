"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Percent, TrendingUp, DollarSign, MoreHorizontal, Settings2, BarChart4 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SalesRate {
  id: string;
  product: string;
  category: string;
  purchaseRate: string;
  salePrice: string;
  margin: string;
  marginPercent: string;
}

const data: SalesRate[] = [
  { id: "SR-001", product: "High-Res IP Camera", category: "Security Equipment", purchaseRate: "₹12,500", salePrice: "₹15,000", margin: "₹2,500", marginPercent: "20%" },
  { id: "SR-002", product: "Mineral Water (20L)", category: "Pantry Supplies", purchaseRate: "₹85", salePrice: "₹110", margin: "₹25", marginPercent: "29.4%" },
  { id: "SR-003", product: "Floor Cleaner (5L)", category: "Cleaning Materials", purchaseRate: "₹450", salePrice: "₹590", margin: "₹140", marginPercent: "31.1%" },
  { id: "SR-004", product: "Safety Vests (L)", category: "Security Equipment", purchaseRate: "₹650", salePrice: "₹850", margin: "₹200", marginPercent: "30.7%" },
];

export default function SalesRatesPage() {
  const columns: ColumnDef<SalesRate>[] = [
    {
      accessorKey: "product",
      header: "Commercial SKU",
      cell: ({ row }) => (
        <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.product}</span>
            <span className="text-[10px] text-muted-foreground font-bold uppercase ">{row.original.category}</span>
        </div>
      ),
    },
    {
      accessorKey: "purchaseRate",
      header: "Avg Purchase",
      cell: ({ row }) => <span className="text-sm font-medium text-muted-foreground">{row.getValue("purchaseRate")}</span>,
    },
    {
        accessorKey: "salePrice",
        header: "Selling Price",
        cell: ({ row }) => <span className="text-sm font-bold text-primary">{row.getValue("salePrice")}</span>,
      },
    {
      accessorKey: "margin",
      header: "Unit Margin",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-success/5 text-success border-success/20 font-bold">
                {row.getValue("margin")}
            </Badge>
            <span className="text-[10px] font-bold text-muted-foreground">({row.original.marginPercent})</span>
        </div>
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
        title="Sale Product Rates"
        description="Revenue control and margin management across the centralized product catalog."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <Percent className="h-4 w-4" /> Global Markup
            </Button>
            <Button className="gap-2 shadow-sm">
               <Plus className="h-4 w-4" /> Add Rate Record
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Avg Profit Margin", value: "28.4%", icon: BarChart4, sub: "Projected across catalog" },
          { label: "High Margin items", value: "142", icon: TrendingUp, sub: "Above 35% target" },
          { label: "Revenue Leakage", value: "None", icon: DollarSign, sub: "All SKUs profitably priced" },
        ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card ring-1 ring-border p-5">
                 <div className="flex items-center justify-between">
                    <div className="flex flex-col text-left">
                        <span className="text-2xl font-bold  text-primary">{stat.value}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-0.5">{stat.label}</span>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary/40">
                        <stat.icon className="h-5 w-5" />
                    </div>
                 </div>
                 <div className="mt-4 pt-4 border-t border-dashed">
                    <span className="text-[10px] font-medium text-muted-foreground">{stat.sub}</span>
                 </div>
            </Card>
        ))}
      </div>

      <DataTable columns={columns} data={data} searchKey="product" />
    </div>
  );
}
