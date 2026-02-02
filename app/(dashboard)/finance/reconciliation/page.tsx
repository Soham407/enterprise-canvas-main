"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  ArrowRightLeft, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Receipt, 
  Box, 
  FileCheck2,
  MoreHorizontal,
  History,
  Filter
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ReconRecord {
  id: string;
  billRef: string;
  grnRef: string;
  vendor: string;
  amountBill: string;
  amountReceived: string;
  variance: string;
  status: "Balanced" | "Discrepancy" | "Under Investigation";
}

const data: ReconRecord[] = [
  { id: "REC-001", billRef: "BIL-1001", grnRef: "GRN-901", vendor: "Global Security Supplies", amountBill: "₹1,45,000", amountReceived: "₹1,45,000", variance: "₹0", status: "Balanced" },
  { id: "REC-002", billRef: "BIL-1002", grnRef: "GRN-905", vendor: "Refresh Beverage Corp", amountBill: "₹22,400", amountReceived: "₹21,800", variance: "₹600", status: "Discrepancy" },
  { id: "REC-003", billRef: "BIL-1003", grnRef: "GRN-908", vendor: "CleanPro Industrial", amountBill: "₹88,900", amountReceived: "₹88,900", variance: "₹0", status: "Balanced" },
];

export default function ReconciliationHubPage() {
  const columns: ColumnDef<ReconRecord>[] = [
    {
      accessorKey: "vendor",
      header: "Vendor Entity",
      cell: ({ row }) => (
        <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.vendor}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">ID: {row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: "refs",
      header: "Matching Documents",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
                 <Receipt className="h-3 w-3 text-primary/50" />
                 <span className="text-[10px] font-mono font-bold mt-1">{row.original.billRef}</span>
            </div>
            <ArrowRightLeft className="h-3 w-3 text-muted-foreground" />
            <div className="flex flex-col items-center">
                 <Box className="h-3 w-3 text-info/50" />
                 <span className="text-[10px] font-mono font-bold mt-1">{row.original.grnRef}</span>
            </div>
        </div>
      ),
    },
    {
      accessorKey: "amountBill",
      header: "Billed Value",
      cell: ({ row }) => <span className="text-sm font-medium text-muted-foreground">{row.getValue("amountBill")}</span>,
    },
    {
        accessorKey: "amountReceived",
        header: "Received Value",
        cell: ({ row }) => <span className="text-sm font-medium text-muted-foreground">{row.getValue("amountReceived")}</span>,
      },
    {
      accessorKey: "variance",
      header: "Variance",
      cell: ({ row }) => (
        <span className={cn(
            "text-sm font-bold",
            row.getValue("variance") === "₹0" ? "text-success" : "text-critical"
        )}>
            {row.getValue("variance")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Recon Status",
      cell: ({ row }) => {
          const val = row.getValue("status") as string;
          const variants: Record<string, string> = {
              "Balanced": "bg-success/10 text-success border-success/20",
              "Discrepancy": "bg-critical/10 text-critical border-critical/20",
              "Under Investigation": "bg-warning/10 text-warning border-warning/20",
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
        <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-2 border-primary/20 text-primary">
                Resolve
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
        title="Account Reconciliation Hub"
        description="Triple-match audit system to reconcile Supplier Bills against Goods Received Notes (GRN) and Purchase Orders."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <History className="h-4 w-4" /> Recon Logs
            </Button>
            <Button className="gap-2 shadow-lg shadow-primary/20">
               <FileCheck2 className="h-4 w-4" /> Automated Sync
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Matches Found", value: "142", icon: CheckCircle2, color: "text-success", sub: "Verified this cycle" },
          { label: "Billing Mismatch", value: "3", icon: AlertTriangle, color: "text-critical", sub: "Potential leakage" },
          { label: "Pending Recon", value: "8", icon: History, color: "text-warning", sub: "Requires manual check" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-card ring-1 ring-border p-5">
               <div className="flex items-center justify-between">
                    <div className="flex flex-col text-left">
                        <span className="text-2xl font-bold ">{stat.value}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-0.5">{stat.label}</span>
                    </div>
                    <div className={cn("h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center", stat.color)}>
                        <stat.icon className="h-5 w-5" />
                    </div>
               </div>
               <div className="mt-4 pt-4 border-t border-dashed">
                    <span className="text-[10px] font-medium text-muted-foreground">{stat.sub}</span>
               </div>
          </Card>
        ))}
      </div>

      <DataTable columns={columns} data={data} searchKey="vendor" />
    </div>
  );
}
