"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Briefcase, ChevronRight, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Designation {
  id: string;
  title: string;
  department: string;
  level: string;
  employeeCount: number;
}

const data: Designation[] = [
  { id: "DES-001", title: "Chief Operations Officer", department: "Operations", level: "L10", employeeCount: 1 },
  { id: "DES-002", title: "Human Resource Manager", department: "HR", level: "L7", employeeCount: 2 },
  { id: "DES-003", title: "Security Supervisor", department: "Security", level: "L5", employeeCount: 8 },
  { id: "DES-004", title: "Facility Engineer", department: "Maintenance", level: "L4", employeeCount: 12 },
  { id: "DES-005", title: "Pantry Coordinator", department: "Soft Services", level: "L3", employeeCount: 4 },
];

export default function DesignationsPage() {
  const columns: ColumnDef<Designation>[] = [
    {
      accessorKey: "title",
      header: "Designation Title",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.title}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-muted/30 border-none font-medium">
          {row.getValue("department")}
        </Badge>
      ),
    },
    {
      accessorKey: "level",
      header: "Grading Level",
      cell: ({ row }) => (
        <span className="text-sm font-mono font-bold text-primary/70">{row.getValue("level")}</span>
      ),
    },
    {
      accessorKey: "employeeCount",
      header: "Active Staff",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-success" />
          <span className="text-sm font-medium">{row.getValue("employeeCount")} members</span>
        </div>
      ),
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
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Designation</DropdownMenuItem>
            <DropdownMenuItem>View Pay Scale</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Designation Master"
        description="Official job titles and positions hierarchy within the organization."
        actions={
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> Add Designation
          </Button>
        }
      />
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
}
