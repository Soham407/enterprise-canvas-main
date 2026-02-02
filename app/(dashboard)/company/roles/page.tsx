"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Shield, Users, Lock, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  status: "Active" | "Inactive";
}

const data: Role[] = [
  {
    id: "RL-001",
    name: "System Administrator",
    description: "Full access to all modules and system settings.",
    userCount: 3,
    permissions: ["All Access"],
    status: "Active",
  },
  {
    id: "RL-002",
    name: "Company MD",
    description: "Viewing rights for all reports and high-level decisioning.",
    userCount: 1,
    permissions: ["Reports", "Finance", "Approvals"],
    status: "Active",
  },
  {
    id: "RL-003",
    name: "Society Manager",
    description: "Local administration for society operations and visitor management.",
    userCount: 5,
    permissions: ["Visitors", "Services", "Tickets"],
    status: "Active",
  },
  {
    id: "RL-004",
    name: "Accountant",
    description: "Access to finance, billing, and supplier payments.",
    userCount: 2,
    permissions: ["Finance", "Ledger", "Invoices"],
    status: "Active",
  },
];

export default function RolesPage() {
  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "name",
      header: "Role Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm ">{row.original.name}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">ID: {row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground line-clamp-1 max-w-[300px]">
          {row.getValue("description")}
        </span>
      ),
    },
    {
      accessorKey: "userCount",
      header: "Users",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm font-medium">{row.getValue("userCount")}</span>
        </div>
      ),
    },
    {
      accessorKey: "permissions",
      header: "Core Permissions",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.permissions.map((p) => (
            <Badge key={p} variant="secondary" className="text-[10px] font-bold px-1.5 py-0 h-4 bg-muted/50 border-none">
              {p}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.getValue("status") === "Active" ? "default" : "secondary"} className={row.getValue("status") === "Active" ? "bg-success/10 text-success border-success/20 hover:bg-success/20" : ""}>
          {row.getValue("status")}
        </Badge>
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
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem className="gap-2">
              <Lock className="h-3.5 w-3.5" /> Edit Permissions
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive gap-2">
              Delete Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Role Master"
        description="Define and manage system access levels and operational permissions."
        actions={
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" /> Create New Role
          </Button>
        }
      />
      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
}
