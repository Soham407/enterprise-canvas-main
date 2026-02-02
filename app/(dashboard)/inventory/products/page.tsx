"use client";

import { Package, Plus, Search, Filter, AlertTriangle, ArrowUpDown, MoreHorizontal, Boxes, Download } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  stock: number;
  minStock: number;
  unit: string;
  status: string;
}

const data: Product[] = [
  { id: "PRD-001", name: "Hand Sanitizer 500ml", category: "Cleaning", sku: "CLN-001", stock: 120, minStock: 50, unit: "Bottles", status: "In Stock" },
  { id: "PRD-002", name: "Floor Cleaner 5L", category: "Cleaning", sku: "CLN-002", stock: 15, minStock: 20, unit: "Jugs", status: "Low Stock" },
  { id: "PRD-003", name: "A4 Photo Paper", category: "Stationery", sku: "STA-042", stock: 450, minStock: 100, unit: "Reams", status: "In Stock" },
  { id: "PRD-004", name: "Security Badge Cards", category: "Security", sku: "SEC-010", stock: 5, minStock: 50, unit: "Packs", status: "Out of Stock" },
];

export default function ProductsPage() {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
            <Package className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm ">{row.original.name}</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase">{row.original.sku}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <span className="text-xs font-semibold px-2 py-1 rounded-md bg-muted/50 text-muted-foreground">
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: "stock",
      header: "Inventory",
      cell: ({ row }) => {
        const prod = row.original;
        const isLow = prod.stock <= prod.minStock && prod.stock > 0;
        const isOut = prod.stock === 0;
        return (
          <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2">
                <span className={cn(
                  "font-bold text-sm",
                  isOut ? "text-critical" : isLow ? "text-warning" : "text-foreground"
                )}>
                  {prod.stock} {prod.unit}
                </span>
                {isLow && <AlertTriangle className="h-3 w-3 text-warning animate-pulse" />}
             </div>
             <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    isOut ? "bg-critical" : isLow ? "bg-warning" : "bg-success"
                  )} 
                  style={{ width: `${Math.min((prod.stock / 200) * 100, 100)}%` }}
                />
             </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        let type: "success" | "warning" | "error" = "success";
        if (status === "Low Stock") type = "warning";
        if (status === "Out of Stock") type = "error";
        return <StatusBadge status={type} label={status} />;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Stock</DropdownMenuItem>
            <DropdownMenuItem>Stock History</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-critical font-bold">Manage Suppliers</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
         <Card className="border-none shadow-card ring-1 ring-border">
            <CardContent className="p-6">
               <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total SKU</span>
                     <span className="text-2xl font-bold mt-1">1,429</span>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                     <Boxes className="h-6 w-6 text-primary" />
                  </div>
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-card ring-1 ring-border border-l-4 border-l-warning">
            <CardContent className="p-6">
               <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-warning">Low Stock</span>
                     <span className="text-2xl font-bold mt-1">24 Items</span>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center">
                     <AlertTriangle className="h-6 w-6 text-warning" />
                  </div>
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-card ring-1 ring-border border-l-4 border-l-critical">
            <CardContent className="p-6">
               <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-critical">Out of Stock</span>
                     <span className="text-2xl font-bold mt-1">8 Items</span>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-critical/10 flex items-center justify-center">
                     <X className="h-6 w-6 text-critical" />
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="module-header">
          <h1 className="module-title font-bold">Material Inventory</h1>
          <p className="module-description">Real-time tracking of consumables and assets.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 font-bold shadow-sm">
            <Download className="h-4 w-4" />
            Stock Report
          </Button>
          <Button className="gap-2 shadow-lg bg-primary hover:bg-primary/90 font-bold">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
}

const X = ({ className }: { className: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
