"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Receipt, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Wallet, 
  Banknote,
  MoreHorizontal,
  Plus,
  Filter,
  ArrowRightLeft,
  FileCheck2,
  AlertCircle
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SupplierBill {
  id: string;
  vendor: string;
  poRef: string;
  amount: string;
  date: string;
  status: "Pending Reconciliation" | "Awaiting Approval" | "Processed" | "Paid";
  auditLevel: "Verified" | "Manual Audit" | "Flagged";
}

const data: SupplierBill[] = [
  { id: "BIL-1001", vendor: "Global Security Supplies", poRef: "PO-2024-001", amount: "₹1,45,000", date: "2024-02-01", status: "Paid", auditLevel: "Verified" },
  { id: "BIL-1002", vendor: "Refresh Beverage Corp", poRef: "PO-2024-002", amount: "₹22,400", date: "2024-02-02", status: "Awaiting Approval", auditLevel: "Verified" },
  { id: "BIL-1003", vendor: "CleanPro Industrial", poRef: "PO-2024-003", amount: "₹88,900", date: "2024-02-02", status: "Pending Reconciliation", auditLevel: "Manual Audit" },
];

export default function SupplierBillsPage() {
  const columns: ColumnDef<SupplierBill>[] = [
    {
      accessorKey: "vendor",
      header: "Supplier Hub",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10">
            <Receipt className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.vendor}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">REF: {row.original.poRef} • {row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Bill Value",
      cell: ({ row }) => <span className="text-sm font-bold text-foreground">{row.getValue("amount")}</span>,
    },
    {
      accessorKey: "date",
      header: "Date Received",
      cell: ({ row }) => <span className="text-xs font-medium text-muted-foreground">{row.getValue("date")}</span>,
    },
    {
      accessorKey: "auditLevel",
      header: "Audit Verification",
      cell: ({ row }) => {
          const val = row.getValue("auditLevel") as string;
          return (
            <div className="flex items-center gap-2">
                <FileCheck2 className={cn(
                    "h-3.5 w-3.5",
                    val === "Verified" ? "text-success" : val === "Flagged" ? "text-critical" : "text-warning"
                )} />
                <span className="text-[10px] font-bold uppercase ">{val}</span>
            </div>
          );
      },
    },
    {
      accessorKey: "status",
      header: "Payout Status",
      cell: ({ row }) => {
          const val = row.getValue("status") as string;
          const variants: Record<string, string> = {
              "Paid": "bg-success/10 text-success border-success/20",
              "Pending Reconciliation": "bg-warning/10 text-warning border-warning/20 animate-pulse-soft",
              "Awaiting Approval": "bg-info/10 text-info border-info/20",
              "Processed": "bg-primary/10 text-primary border-primary/20"
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
            <Button size="sm" variant="outline" className="h-8 gap-2 text-primary border-primary/20 hover:bg-primary/5">
                Reconcile
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
        title="Supplier Bill Processing"
        description="Verify, reconcile and approve vendor invoices against Purchase Orders and Receipt Notes."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <ArrowRightLeft className="h-4 w-4" /> Reconciliation Sheet
            </Button>
            <Button className="gap-2 shadow-lg shadow-primary/20">
               <Plus className="h-4 w-4" /> New Bill Intake
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Accounts Payable", value: "₹12,45,000", icon: Wallet, color: "text-primary", sub: "Total current liability" },
          { label: "Approved Payouts", value: "₹8,12,000", icon: CheckCircle2, color: "text-success", sub: "Scheduled for payment" },
          { label: "Pending Verification", value: "₹3,42,000", icon: Clock, color: "text-warning", sub: "12 bills in queue" },
          { label: "Audit Discrepancies", value: "2", icon: AlertCircle, color: "text-critical", sub: "Price/Qty mismatch" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
               <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className={cn("h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center", stat.color)}>
                            <stat.icon className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</span>
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-xl font-bold ">{stat.value}</span>
                        <span className="text-[10px] font-medium text-muted-foreground mt-0.5">{stat.sub}</span>
                    </div>
                </div>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-premium overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold">Billing Registry</CardTitle>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-success/5 text-success border-success/20">Active Cycle</Badge>
                <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-bold">A{i}</div>
                    ))}
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-0">
            <DataTable columns={columns} data={data} searchKey="vendor" />
        </CardContent>
      </Card>
    </div>
  );
}
