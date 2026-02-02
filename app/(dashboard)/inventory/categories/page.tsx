"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, FolderTree, Layers, MoreHorizontal, LayoutGrid, Box } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  code: string;
  description: string;
  itemCount: number;
  status: "Active" | "Archived";
}

const data: Category[] = [
  { id: "CAT-001", name: "Security Equipment", code: "SEC-EQ", description: "CCTV, Alarms, Scanners and Handhelds", itemCount: 24, status: "Active" },
  { id: "CAT-002", name: "Pantry Supplies", code: "PTRY", description: "Beverages, Snacks and Disposables", itemCount: 145, status: "Active" },
  { id: "CAT-003", name: "Cleaning Materials", code: "CLN", description: "Chemicals, Tools and Sanitizers", itemCount: 68, status: "Active" },
  { id: "CAT-004", name: "Uniforms & Gear", code: "UNIF", description: "Staff Uniforms, Badges and Protective Gear", itemCount: 32, status: "Active" },
];

export default function CategoriesPage() {
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Category Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
            <FolderTree className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.name}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.code}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.getValue("description")}</span>,
    },
    {
      accessorKey: "itemCount",
      header: "Total Products",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Box className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm font-medium">{row.getValue("itemCount")} SKUs</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className={cn("font-bold text-[10px] uppercase h-5", row.getValue("status") === "Active" ? "bg-success/10 text-success border-success/20" : "")}>
            {row.getValue("status")}
        </Badge>
      ),
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
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Inventory Categories"
        description="Define and manage top-level classifications for standardizing and reporting inventory."
        actions={
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> New Category
          </Button>
        }
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Active Categories", value: "12", icon: FolderTree },
          { label: "Archived", value: "2", icon: Layers },
          { label: "System Default", value: "4", icon: LayoutGrid },
        ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center text-primary">
                        <stat.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-2xl font-bold ">{stat.value}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</span>
                    </div>
                </div>
            </Card>
        ))}
      </div>

      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
}
