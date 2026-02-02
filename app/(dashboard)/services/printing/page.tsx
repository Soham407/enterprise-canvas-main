"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  Printer, 
  UserSquare2, 
  Map as MapIcon, 
  Image as ImageIcon, 
  Plus, 
  MoreHorizontal,
  Layout,
  FileText,
  BadgeCent
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface AdSpace {
  id: string;
  location: string;
  type: "Lift Poster" | "Notice Board" | "Gate Banner";
  currentAd: string;
  expiryDate: string;
  revenueStatus: "Paid" | "Pending" | "Vacant";
}

const adData: AdSpace[] = [
  { id: "AD-01", location: "Lift A1 - Interal Panel", type: "Lift Poster", currentAd: "Zomato Gold Offer", expiryDate: "2024-02-15", revenueStatus: "Paid" },
  { id: "AD-02", location: "Main Gate - Entry Banner", type: "Gate Banner", currentAd: "Vite Realty Launch", expiryDate: "2024-03-01", revenueStatus: "Paid" },
  { id: "AD-03", location: "Clubhouse Notice Board", type: "Notice Board", currentAd: "None", expiryDate: "-", revenueStatus: "Vacant" },
];

export default function PrintingAdvertisingPage() {
  const columns: ColumnDef<AdSpace>[] = [
    {
      accessorKey: "location",
      header: "Ad Location",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
            <Layout className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm ">{row.original.location}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold ">{row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Media Type",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-muted/30 border-none font-medium">
          {row.getValue("type")}
        </Badge>
      ),
    },
    {
      accessorKey: "currentAd",
      header: "Current Campaign",
      cell: ({ row }) => (
        <span className={cn(
            "text-xs font-bold",
            row.getValue("currentAd") === "None" ? "text-muted-foreground italic" : "text-foreground"
        )}>
            {row.getValue("currentAd")}
        </span>
      ),
    },
    {
      accessorKey: "expiryDate",
      header: "Contract End",
      cell: ({ row }) => <span className="text-xs font-medium text-muted-foreground">{row.getValue("expiryDate")}</span>,
    },
    {
      accessorKey: "revenueStatus",
      header: "Payment",
      cell: ({ row }) => {
          const val = row.getValue("revenueStatus") as string;
          const variants: Record<string, string> = {
              "Paid": "bg-success/10 text-success border-success/20",
              "Pending": "bg-warning/10 text-warning border-warning/20",
              "Vacant": "bg-muted text-muted-foreground border-border"
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
        <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <PageHeader
        title="Printing & Advertising"
        description="Internal document generation, staff ID portal, and society ad-space monetization management."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
               <Printer className="h-4 w-4" /> Bulk Print
            </Button>
            <Button className="gap-2 shadow-sm">
               <Plus className="h-4 w-4" /> Register Ad Space
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-card ring-1 ring-border p-6 flex flex-col gap-4 group cursor-pointer hover:ring-primary/20 transition-all">
            <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <UserSquare2 className="h-5 w-5" />
                </div>
                <BadgeCheck className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col text-left">
                <span className="text-lg font-bold">Personnel ID Portal</span>
                <span className="text-xs text-muted-foreground">Automatically generate staff & guard cards.</span>
            </div>
        </Card>

        <Card className="border-none shadow-card ring-1 ring-border p-6 flex flex-col gap-4 group cursor-pointer hover:ring-primary/20 transition-all">
            <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-info/5 text-info flex items-center justify-center group-hover:bg-info group-hover:text-white transition-all">
                    <FileText className="h-5 w-5" />
                </div>
                <BadgeCheck className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col text-left">
                <span className="text-lg font-bold">Document Templates</span>
                <span className="text-xs text-muted-foreground">Water cut alerts, meeting minutes, etc.</span>
            </div>
        </Card>

        <Card className="border-none shadow-premium bg-linear-to-br from-indigo-600 to-indigo-800 text-white p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <BadgeCent className="h-5 w-5 font-bold" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/70">Ad Revenue</span>
            </div>
            <div className="flex flex-col text-left">
                <span className="text-2xl font-bold ">₹84,500</span>
                <span className="text-[10px] font-bold text-white/60 uppercase mt-0.5">Projected Monthly Earning</span>
            </div>
        </Card>
      </div>

      <Tabs defaultValue="adspace" className="w-full">
            <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-8">
                <TabsTrigger value="adspace" className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-widest">Ad-Space Master</TabsTrigger>
                <TabsTrigger value="printing" className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-widest">Internal Printing</TabsTrigger>
                <TabsTrigger value="history" className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-bold text-xs uppercase tracking-widest">Usage Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="adspace" className="pt-6">
                <DataTable columns={columns} data={adData} searchKey="location" />
            </TabsContent>

            <TabsContent value="printing" className="pt-6">
                <div className="p-20 text-center border-2 border-dashed rounded-2xl bg-muted/20">
                    <CardDescription>UI for automated generation of long-term Visitor Passes and ID Cards.</CardDescription>
                </div>
            </TabsContent>
      </Tabs>
    </div>
  );
}

import { BadgeCheck } from "lucide-react";
