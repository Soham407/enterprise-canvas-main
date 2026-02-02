"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, ListTree, Folder, MoreHorizontal, Subtitles, Tags } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Subcategory {
  id: string;
  name: string;
  parentCategory: string;
  code: string;
  itemCount: number;
}

const data: Subcategory[] = [
  { id: "SUB-001", name: "Detergents", parentCategory: "Cleaning Materials", code: "CLN-DET", itemCount: 18 },
  { id: "SUB-002", name: "Disinfectants", parentCategory: "Cleaning Materials", code: "CLN-DIS", itemCount: 12 },
  { id: "SUB-003", name: "Tea & Coffee", parentCategory: "Pantry Supplies", code: "PTRY-TC", itemCount: 25 },
  { id: "SUB-004", name: "Soft Drinks", parentCategory: "Pantry Supplies", code: "PTRY-SD", itemCount: 30 },
  { id: "SUB-005", name: "IP Cameras", parentCategory: "Security Equipment", code: "SEC-IPC", itemCount: 15 },
];

export default function SubcategoriesPage() {
  const columns: ColumnDef<Subcategory>[] = [
    {
      accessorKey: "name",
      header: "Subcategory",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-info/5 flex items-center justify-center">
            <Tags className="h-4 w-4 text-info" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.name}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.code}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "parentCategory",
      header: "Master Category",
      cell: ({ row }) => (
        <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-bold text-[10px] uppercase">
            {row.getValue("parentCategory")}
        </Badge>
      ),
    },
    {
      accessorKey: "itemCount",
      header: "SKU Density",
      cell: ({ row }) => <span className="text-sm font-medium">{row.getValue("itemCount")} Products</span>,
    },
    {
      id: "actions",
      cell: () => (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Inventory Subcategories"
        description="Nested classifications for more granular inventory organization and stock tracking."
        actions={
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> Create Subcategory
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Active Nodes", value: "48", icon: ListTree, color: "text-primary" },
          { label: "Deepest Link", value: "L4", icon: Subtitles, color: "text-info" },
          { label: "Uncategorized", value: "0", icon: Folder, color: "text-success" },
          { label: "Ref. Nodes", value: "124", icon: Tags, color: "text-warning" },
        ].map((stat, i) => (
            <Card key={i} className="border-none shadow-card ring-1 ring-border p-4">
                <div className="flex items-center gap-4">
                    <div className={cn("h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center", stat.color)}>
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
