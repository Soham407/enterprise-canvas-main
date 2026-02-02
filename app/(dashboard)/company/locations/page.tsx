"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Navigation, Map as MapIcon, MoreHorizontal, Radio } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LocationPoint {
  id: string;
  siteName: string;
  category: string;
  trackingRadius: string;
  gpsCoordinates: string;
  activeGuards: number;
}

const data: LocationPoint[] = [
  { id: "LOC-01", siteName: "Main Entrance Gate", category: "Entry/Exit", trackingRadius: "50 Meters", gpsCoordinates: "12.9716° N, 77.5946° E", activeGuards: 3 },
  { id: "LOC-02", siteName: "Tower A Reception", category: "Lobby", trackingRadius: "30 Meters", gpsCoordinates: "12.9719° N, 77.5949° E", activeGuards: 1 },
  { id: "LOC-03", siteName: "Basement Parking B2", category: "Security Zone", trackingRadius: "100 Meters", gpsCoordinates: "12.9712° N, 77.5941° E", activeGuards: 2 },
  { id: "LOC-04", siteName: "Clubhouse Perimeter", category: "Amenity", trackingRadius: "150 Meters", gpsCoordinates: "12.9725° N, 77.5955° E", activeGuards: 1 },
];

export default function LocationsPage() {
  const columns: ColumnDef<LocationPoint>[] = [
    {
      accessorKey: "siteName",
      header: "Site / Point Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.siteName}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-muted/30 border-none font-medium">
          {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "trackingRadius",
      header: "Geo-Fence Radius",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
           <Radio className="h-3 w-3 text-warning animate-pulse" />
           <span className="text-xs font-bold text-foreground/80">{row.getValue("trackingRadius")}</span>
        </div>
      ),
    },
    {
      accessorKey: "gpsCoordinates",
      header: "GPS Mapping",
      cell: ({ row }) => (
        <code className="text-[10px] bg-muted px-2 py-1 rounded font-mono text-muted-foreground">
          {row.getValue("gpsCoordinates")}
        </code>
      ),
    },
    {
      accessorKey: "activeGuards",
      header: "Current Manning",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <Navigation className="h-3.5 w-3.5 text-success" />
            <span className="text-sm font-bold">{row.getValue("activeGuards")} Personnel</span>
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
            <DropdownMenuItem>Adjust Radius</DropdownMenuItem>
            <DropdownMenuItem>View Guard Logs</DropdownMenuItem>
            <DropdownMenuItem>Test Geo-Fence</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Company Location Master"
        description="Catalog of physical sites and GPS-enabled geo-fencing points for staff tracking."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <MapIcon className="h-4 w-4" /> View Map Layout
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Register Site
            </Button>
          </div>
        }
      />
      
      <div className="grid gap-6">
        <DataTable columns={columns} data={data} searchKey="siteName" />
      </div>
    </div>
  );
}
