"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  FileText, 
  Truck, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreHorizontal,
  ArrowUpRight,
  Filter
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PurchaseOrder {
  id: string;
  vendor: string;
  items: number;
  totalValue: string;
  date: string;
  status: "Draft" | "Pending Approval" | "Sent to Vendor" | "Shipped" | "Received" | "Partially Received";
}

const data: PurchaseOrder[] = [
  { id: "PO-2024-001", vendor: "Global Security Supplies", items: 12, totalValue: "₹1,45,000", date: "2024-01-28", status: "Sent to Vendor" },
  { id: "PO-2024-002", vendor: "Refresh Beverage Corp", items: 45, totalValue: "₹22,400", date: "2024-01-30", status: "Received" },
  { id: "PO-2024-003", vendor: "CleanPro Industrial", items: 8, totalValue: "₹88,900", date: "2024-02-01", status: "Pending Approval" },
  { id: "PO-2024-004", vendor: "QuickPrint Media", items: 2, totalValue: "₹5,200", date: "2024-02-01", status: "Shipped" },
];

export default function POTrackingPage() {
  const columns: ColumnDef<PurchaseOrder>[] = [
    {
      accessorKey: "id",
      header: "PO Reference",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.id}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">Date: {row.original.date}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "vendor",
      header: "Supplier",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-foreground/80">{row.getValue("vendor")}</span>
      ),
    },
    {
      accessorKey: "items",
      header: "Line Items",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-muted/30 border-none font-medium">
          {row.getValue("items")} items
        </Badge>
      ),
    },
    {
      accessorKey: "totalValue",
      header: "Order Value",
      cell: ({ row }) => (
        <span className="text-sm font-bold">{row.getValue("totalValue")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Logistics Status",
      cell: ({ row }) => {
        const val = row.getValue("status") as string;
        const variants: Record<string, string> = {
            "Sent to Vendor": "bg-info/10 text-info border-info/20",
            "Received": "bg-success/10 text-success border-success/20",
            "Pending Approval": "bg-warning/10 text-warning border-warning/20",
            "Shipped": "bg-primary/10 text-primary border-primary/20 animate-pulse-soft"
        };
        return (
          <Badge variant="outline" className={cn("font-bold text-[10px] uppercase", variants[val] || "")}>
            {val}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2">
                <ArrowUpRight className="h-3.5 w-3.5" /> View Full Order
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
                <Truck className="h-3.5 w-3.5" /> Track Shipment
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-success font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" /> Acknowledge Receipt
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader
        title="Purchase Orders"
        description="Lifecycle tracking for all material procurement from external vendors."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Advanced Filter
            </Button>
            <Button className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" /> Raise New PO
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Draft POs", value: "8", icon: FileText, color: "text-muted-foreground" },
          { label: "In Approval", value: "3", icon: Clock, color: "text-warning" },
          { label: "Active Tracking", value: "14", icon: Truck, color: "text-primary" },
          { label: "Delayed/Alert", value: "1", icon: AlertCircle, color: "text-critical" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
            <div className="flex items-center gap-4">
              <div className={cn("h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</span>
                <span className="text-2xl font-bold ">{stat.value}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <DataTable columns={columns} data={data} searchKey="vendor" />
    </div>
  );
}

// Ensure Card/Other UI pieces are imported correctly
import { Card } from "@/components/ui/card";
