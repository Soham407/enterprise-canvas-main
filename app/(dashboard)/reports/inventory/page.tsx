"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  TrendingDown, 
  AlertTriangle, 
  BarChart, 
  Download, 
  Filter, 
  History, 
  ArrowRight,
  ShieldCheck,
  Zap,
  MoreHorizontal
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InventoryReport {
  id: string;
  itemName: string;
  category: string;
  stockLevel: string;
  consumptionRate: string;
  daysToStockout: string;
}

const data: InventoryReport[] = [
  { id: "REP-I-01", itemName: "High-Res IP Camera", category: "Security", stockLevel: "12 units", consumptionRate: "2/mo", daysToStockout: "180 days" },
  { id: "REP-I-02", itemName: "Mineral Water (20L)", category: "Pantry", stockLevel: "45 jars", consumptionRate: "15/day", daysToStockout: "3 days" },
  { id: "REP-I-03", itemName: "Floor Cleaner (5L)", category: "Cleaning", stockLevel: "8 crates", consumptionRate: "1/week", daysToStockout: "56 days" },
  { id: "REP-I-04", itemName: "Safety Vests (L)", category: "Security", stockLevel: "150 units", consumptionRate: "20/mo", daysToStockout: "225 days" },
];

export default function InventoryAnalysisPage() {
  const columns: ColumnDef<InventoryReport>[] = [
    {
      accessorKey: "itemName",
      header: "Strategic SKU",
      cell: ({ row }) => (
        <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.itemName}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.category}</span>
        </div>
      ),
    },
    {
      accessorKey: "stockLevel",
      header: "Current Depth",
      cell: ({ row }) => <span className="text-sm font-medium">{row.getValue("stockLevel")}</span>,
    },
    {
      accessorKey: "consumptionRate",
      header: "Burn Rate",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
            <TrendingDown className="h-3 w-3 text-critical/50" /> {row.getValue("consumptionRate")}
        </div>
      ),
    },
    {
      accessorKey: "daysToStockout",
      header: "Stockout Forecast",
      cell: ({ row }) => {
          const val = row.getValue("daysToStockout") as string;
          const isCritical = parseInt(val) < 7;
          return (
            <Badge variant="outline" className={cn(
                "font-bold text-[10px] uppercase h-5",
                isCritical ? "bg-critical/5 text-critical border-critical/20 animate-pulse-soft" : "bg-success/5 text-success border-success/20"
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
    <div className="animate-fade-in space-y-8 pb-20">
      <PageHeader
        title="Inventory Consumption Analytics"
        description="Predictive stock analysis, burn rate tracking, and automated stockout forecasting engine."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <History className="h-4 w-4" /> Usage Audit
            </Button>
            <Button className="gap-2 shadow-sm">
               <Download className="h-4 w-4" /> Stock Report
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Stockout Risk", value: "3 SKUs", icon: AlertTriangle, color: "text-critical", sub: "Action required" },
          { label: "Optimal Stock", value: "84%", icon: ShieldCheck, color: "text-success", sub: "Within target" },
          { label: "Dead Stock", value: "12%", icon: Package, color: "text-warning", sub: "Slow turnover" },
          { label: "Active Reorders", value: "5", icon: Zap, color: "text-info", sub: "Pending delivery" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
               <div className="flex items-center gap-4 text-left">
                    <div className={cn("h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center", stat.color)}>
                        <stat.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold ">{stat.value}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</span>
                    </div>
                </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-none shadow-card ring-1 ring-border">
              <CardHeader>
                  <CardTitle className="text-sm font-bold">Category Burn Chart</CardTitle>
                  <CardDescription className="text-[10px]">Monthly consumption trends.</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center bg-muted/20 border-t border-dashed rounded-b-xl italic text-xs text-muted-foreground">
                    Bar chart rendering...
              </CardContent>
          </Card>
          <Card className="border-none shadow-card ring-1 ring-border">
              <CardHeader>
                  <CardTitle className="text-sm font-bold">Reorder Heatmap</CardTitle>
                  <CardDescription className="text-[10px]">Priority procurement nodes.</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center bg-muted/20 border-t border-dashed rounded-b-xl italic text-xs text-muted-foreground">
                    Spatial distribution...
              </CardContent>
          </Card>
      </div>

      <DataTable columns={columns} data={data} searchKey="itemName" />
    </div>
  );
}
