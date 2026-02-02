"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal, 
  ArrowRightLeft,
  FileCheck2,
  Lock
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VerificationItem {
  id: string;
  product: string;
  proposedRate: string;
  masterRate: string;
  variance: string;
  status: "Matches" | "Price Conflict" | "Awaiting Override";
}

const data: VerificationItem[] = [
  { id: "V-101", product: "High-Res IP Camera", proposedRate: "₹12,800", masterRate: "₹12,500", variance: "+2.4%", status: "Price Conflict" },
  { id: "V-102", product: "Mineral Water (20L)", proposedRate: "₹85", masterRate: "₹85", variance: "0%", status: "Matches" },
  { id: "V-103", product: "Floor Cleaner (5L)", proposedRate: "₹450", masterRate: "₹450", variance: "0%", status: "Matches" },
  { id: "V-104", product: "Metal Detector", proposedRate: "₹8,400", masterRate: "₹7,200", variance: "+16.6%", status: "Awaiting Override" },
];

export default function IndentVerificationPage() {
  const columns: ColumnDef<VerificationItem>[] = [
    {
      accessorKey: "product",
      header: "Product / Service SKU",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
            <Lock className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.product}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">REF: {row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "proposedRate",
      header: "Indent Rate",
      cell: ({ row }) => <span className="text-sm font-bold text-foreground">{row.getValue("proposedRate")}</span>,
    },
    {
        accessorKey: "masterRate",
        header: "Master Contract",
        cell: ({ row }) => <span className="text-sm font-medium text-muted-foreground">{row.getValue("masterRate")}</span>,
      },
    {
      accessorKey: "variance",
      header: "Variance",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <span className={cn(
                "text-xs font-bold",
                row.getValue("variance") === "0%" ? "text-success" : "text-critical"
            )}>
                {row.getValue("variance")}
            </span>
            {row.getValue("variance") !== "0%" && <ArrowRightLeft className="h-3 w-3 text-critical" />}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Logic Hub Status",
      cell: ({ row }) => {
          const val = row.getValue("status") as string;
          const variants: Record<string, string> = {
              "Matches": "bg-success/10 text-success border-success/20",
              "Price Conflict": "bg-critical/10 text-critical border-critical/20",
              "Awaiting Override": "bg-warning/10 text-warning border-warning/20",
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
        <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-2 text-success border-success/20 hover:bg-success/5">
                <CheckCircle2 className="h-3.5 w-3.5" /> Approve
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
        title="Indent Price Verification"
        description="Mandatory audit step to verify proposed indent prices against pre-negotiated Master Contract Rates before purchase finalization."
        actions={
          <Button variant="outline" className="gap-2">
            <FileCheck2 className="h-4 w-4" /> Override Master Log
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-card ring-1 ring-border p-4 bg-success/5">
             <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col text-left">
                    <span className="text-2xl font-bold ">92%</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Rate Compliant</span>
                 </div>
             </div>
        </Card>
        <Card className="border-none shadow-card ring-1 ring-border p-4 bg-critical/5">
             <div className="flex items-center gap-4 text-left">
                 <div className="h-10 w-10 rounded-xl bg-critical/10 text-critical flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-bold ">₹4,200</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Pricing Leakage Detected</span>
                 </div>
             </div>
        </Card>
        <Card className="border-none shadow-card ring-1 ring-border p-4 bg-primary/5">
             <div className="flex items-center gap-4 text-left">
                 <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <FileCheck2 className="h-5 w-5" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-bold ">14</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">SKUs Verified Today</span>
                 </div>
             </div>
        </Card>
      </div>

      <DataTable columns={columns} data={data} searchKey="product" />
    </div>
  );
}
