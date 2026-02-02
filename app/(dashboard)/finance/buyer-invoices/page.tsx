"use client";

import { FileText, Plus, Download, Filter, Search, MoreHorizontal, ArrowUpRight, DollarSign, Clock, CheckCircle2 } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: string;
  dueDate: string;
  issueDate: string;
}

const data: Invoice[] = [
  { id: "INV-2024-001", client: "TechCorp Industries", amount: 12500.00, status: "Paid", dueDate: "2024-02-15", issueDate: "2024-01-15" },
  { id: "INV-2024-002", client: "Cloudnine Solutions", amount: 8900.50, status: "Pending", dueDate: "2024-02-20", issueDate: "2024-01-20" },
  { id: "INV-2024-003", client: "Green Valley Trust", amount: 4200.00, status: "Overdue", dueDate: "2024-01-30", issueDate: "2024-01-01" },
  { id: "INV-2024-004", client: "Skyline Residency", amount: 15600.00, status: "Paid", dueDate: "2024-02-05", issueDate: "2024-01-05" },
];

export default function BuyerInvoicesPage() {
  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "id",
      header: "Invoice ID",
      cell: ({ row }) => <span className="font-bold font-mono text-xs">{row.original.id}</span>
    },
    {
      accessorKey: "client",
      header: "Buyer / Client",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-sm ">{row.original.client}</span>
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Contract #8292-A</span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-bold text-sm">
          ${row.original.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        let type = "info";
        if (status === "Paid") type = "success";
        if (status === "Overdue") type = "error";
        if (status === "Pending") type = "warning";
        return <StatusBadge status={type} label={status} />;
      },
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs font-medium">{row.original.dueDate}</span>
        </div>
      )
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
            <DropdownMenuLabel>Invoice Options</DropdownMenuLabel>
            <DropdownMenuItem className="gap-2">
               <FileText className="h-4 w-4" /> View PDF
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
               <DollarSign className="h-4 w-4" /> Record Payment
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-critical font-bold">Write Off</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Finance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
         <Card className="border-none shadow-card ring-1 ring-border">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-[10px] uppercase font-bold tracking-widest">Total Outstanding</CardDescription>
              <CardTitle className="text-2xl font-bold">$48,290.00</CardTitle>
            </CardHeader>
         </Card>
         <Card className="border-none shadow-card ring-1 ring-border bg-success/5 border-l-4 border-l-success">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-success">Collected (MTD)</CardDescription>
              <CardTitle className="text-2xl font-bold text-success">$124,500.00</CardTitle>
            </CardHeader>
         </Card>
         <Card className="border-none shadow-card ring-1 ring-border bg-critical/5 border-l-4 border-l-critical">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-critical">Overdue</CardDescription>
              <CardTitle className="text-2xl font-bold text-critical">$4,200.00</CardTitle>
            </CardHeader>
         </Card>
         <Card className="border-none shadow-card ring-1 ring-border">
            <CardHeader className="p-4 pb-2">
              <CardDescription className="text-[10px] uppercase font-bold tracking-widest">Pending Sync</CardDescription>
              <CardTitle className="text-2xl font-bold">12</CardTitle>
            </CardHeader>
         </Card>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="module-header">
          <h1 className="module-title font-bold uppercase ">Buyer Invoices</h1>
          <p className="module-description">Monitor receivables and billing cycles for service clients.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 font-bold">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="gap-2 shadow-lg bg-primary hover:bg-primary/90 font-bold">
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchKey="client" />
    </div>
  );
}
