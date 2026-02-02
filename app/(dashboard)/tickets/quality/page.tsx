"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Box, 
  AlertTriangle, 
  FileWarning, 
  ArrowLeftRight, 
  Plus, 
  MoreHorizontal,
  FileSearch,
  Camera,
  Layers,
  CheckCircle2,
  XCircle,
  Filter
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QualityTicket {
  id: string;
  poRef: string;
  vendor: string;
  item: string;
  issueType: "Shortage" | "Damaged" | "Expired" | "Wrong Item";
  recordedQty: string;
  expectedQty: string;
  status: "Under Review" | "Debit Note Raised" | "Returned" | "Resolved";
}

const data: QualityTicket[] = [
  { id: "TKT-Q-101", poRef: "PO-2024-001", vendor: "Global Security Supplies", item: "Safety Vests (L)", issueType: "Shortage", recordedQty: "45", expectedQty: "50", status: "Debit Note Raised" },
  { id: "TKT-Q-105", poRef: "PO-2024-002", vendor: "Refresh Beverage Corp", item: "Mineral Water (20L)", issueType: "Damaged", recordedQty: "2", expectedQty: "50", status: "Under Review" },
  { id: "TKT-Q-108", poRef: "PO-2024-004", vendor: "QuickPrint Media", item: "Staff ID Cards", issueType: "Wrong Item", recordedQty: "1", expectedQty: "1", status: "Returned" },
];

export default function QualityTicketsPage() {
  const columns: ColumnDef<QualityTicket>[] = [
    {
      accessorKey: "item",
      header: "Material / Item",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-info/5 flex items-center justify-center">
            <Box className="h-4 w-4 text-info" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.item}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">REF: {row.original.poRef} • {row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "vendor",
      header: "Origin Supplier",
      cell: ({ row }) => <span className="text-sm font-medium text-foreground/80">{row.getValue("vendor")}</span>,
    },
    {
      accessorKey: "issueType",
      header: "Discrepancy",
      cell: ({ row }) => (
        <Badge variant="outline" className={cn(
            "text-[10px] uppercase font-bold px-2 py-0.5",
            row.original.issueType === "Shortage" ? "bg-warning/5 text-warning border-warning/20" : "bg-critical/5 text-critical border-critical/20"
        )}>
            {row.getValue("issueType")}
        </Badge>
      ),
    },
    {
      accessorKey: "recordedQty",
      header: "Verification",
      cell: ({ row }) => (
        <div className="flex flex-col">
            <span className="text-xs font-bold text-critical">Actual: {row.original.recordedQty}</span>
            <span className="text-[10px] text-muted-foreground font-medium">Expected: {row.original.expectedQty}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Resolution Path",
      cell: ({ row }) => {
          const val = row.getValue("status") as string;
          const variants: Record<string, string> = {
              "Under Review": "bg-warning/10 text-warning border-warning/20",
              "Debit Note Raised": "bg-primary/10 text-primary border-primary/20",
              "Returned": "bg-critical/10 text-critical border-critical/20",
              "Resolved": "bg-success/10 text-success border-success/20"
          };
          return (
            <Badge variant="outline" className={cn("font-bold text-[10px] uppercase h-5", variants[val] || "")}>
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
                <Camera className="h-4 w-4" />
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
        title="Quality & Quantity Tickets"
        description="Logging material discrepancies, damaged goods, and shortage notes post-delivery verification."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <FileSearch className="h-4 w-4" /> Audit Logs
            </Button>
            <Button className="gap-2 shadow-sm">
               <Plus className="h-4 w-4" /> Log Discrepancy
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Shortage Notes", value: "3", icon: Layers, color: "text-warning" },
          { label: "Damaged Goods", value: "1", icon: AlertTriangle, color: "text-critical" },
          { label: "Return Pending (RTV)", value: "2", icon: ArrowLeftRight, color: "text-primary" },
          { label: "Quality Audit", value: "100%", icon: CheckCircle2, color: "text-success" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
            <div className="flex items-center gap-4 text-left">
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

      <DataTable columns={columns} data={data} searchKey="item" />
    </div>
  );
}
