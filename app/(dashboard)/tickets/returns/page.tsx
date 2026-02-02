"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  RotateCcw, 
  Truck, 
  FileWarning, 
  MoreHorizontal, 
  ArrowRightLeft, 
  PackageX,
  ShieldAlert,
  History,
  CheckCircle2
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RTVTicket {
  id: string;
  vendor: string;
  poRef: string;
  item: string;
  returnReason: "Broken/Damaged" | "Wrong Specification" | "Shortage" | "Expired";
  qty: string;
  status: "Pending Dispatch" | "In Transit" | "Accepted by Vendor" | "Credit Note Issued";
}

const data: RTVTicket[] = [
  { id: "RTV-01", vendor: "Global Security Supplies", poRef: "PO-2024-001", item: "Safety Vests (L)", returnReason: "Broken/Damaged", qty: "5", status: "In Transit" },
  { id: "RTV-05", vendor: "QuickPrint Media", poRef: "PO-2024-004", item: "Staff ID Cards", returnReason: "Wrong Specification", qty: "1", status: "Accepted by Vendor" },
  { id: "RTV-08", vendor: "CleanPro Industrial", poRef: "PO-2024-003", item: "Floor Scrubbing Machine", returnReason: "Expired", qty: "2", status: "Pending Dispatch" },
];

export default function RTVManagementPage() {
  const columns: ColumnDef<RTVTicket>[] = [
    {
      accessorKey: "item",
      header: "Material Detail",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-critical/5 flex items-center justify-center">
            <PackageX className="h-4 w-4 text-critical" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.item}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">REF: {row.original.id} • {row.original.poRef}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "vendor",
      header: "Origin Vendor",
      cell: ({ row }) => <span className="text-sm font-medium text-foreground">{row.getValue("vendor")}</span>,
    },
    {
      accessorKey: "returnReason",
      header: "Defect Reason",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-critical/5 text-critical border-critical/10 font-bold text-[10px] uppercase">
            {row.getValue("returnReason")}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Workflow Stage",
      cell: ({ row }) => {
          const val = row.getValue("status") as string;
          const variants: Record<string, string> = {
              "Accepted by Vendor": "bg-success/10 text-success border-success/20",
              "Credit Note Issued": "bg-primary/10 text-primary border-primary/20",
              "Pending Dispatch": "bg-warning/10 text-warning border-warning/20",
              "In Transit": "bg-info/10 text-info border-info/20 animate-pulse-soft"
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
                <Truck className="h-4 w-4" />
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
        title="Return To Vendor (RTV)"
        description="Formal lifecycle management for returning damaged, wrong, or surplus materials to the origin supplier."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <History className="h-4 w-4" /> Return History
            </Button>
            <Button variant="destructive" className="gap-2 shadow-lg shadow-critical/20">
               <RotateCcw className="h-4 w-4" /> Initiate Return
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Pending Pickup", value: "3", icon: PackageX, color: "text-critical" },
          { label: "In Transit (RTV)", value: "2", icon: Truck, color: "text-info" },
          { label: "Credit Pending", value: "₹18,450", icon: CheckCircle2, color: "text-warning" },
          { label: "Monthly Returns", value: "12", icon: History, color: "text-primary" },
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
