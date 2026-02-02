"use client";

import { Calculator, ArrowDownLeft, ArrowUpRight, CheckCircle2, AlertTriangle, FileText, Search, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AccountsDashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold ">Finance & Reconciliation</h1>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Managing the ledger, billing, and triple-match audits.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2 font-bold h-10 border-muted-foreground/20">
               <Download className="h-4 w-4" /> Export Ledger
           </Button>
           <Button className="gap-2 font-bold shadow-lg shadow-primary/20 h-10">
               <Calculator className="h-4 w-4" /> Run Reconciliation
           </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
          {[
              { label: "Accounts Receivable", value: "₹1.4M", change: "+12.5%", trend: "up", color: "text-primary" },
              { label: "Accounts Payable", value: "₹480k", change: "-4.2%", trend: "down", color: "text-critical" },
              { label: "Pending Verifications", value: "12", change: "Action required", trend: "warning", color: "text-warning" },
              { label: "Collection Rate", value: "94.2%", change: "Industry top", trend: "up", color: "text-success" },
          ].map((stat, i) => (
              <Card key={i} className="border-none shadow-card ring-1 ring-border p-4 bg-muted/20">
                  <div className="flex flex-col gap-1 text-left">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">{stat.label}</span>
                      <span className={cn("text-2xl font-bold", stat.color)}>{stat.value}</span>
                      <div className="flex items-center gap-1 mt-1">
                          <span className={cn("text-[10px] font-bold", stat.trend === "up" ? "text-success" : stat.trend === "down" ? "text-critical" : "text-warning")}>
                              {stat.change}
                          </span>
                      </div>
                  </div>
              </Card>
          ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
          {/* Billing Status */}
          <Card className="border-none shadow-card ring-1 ring-border">
              <CardHeader className="bg-muted/5 border-b flex flex-row items-center justify-between py-3">
                  <CardTitle className="text-sm font-bold uppercase ">Billing Cycle (Triple-Match Status)</CardTitle>
                  <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0">
                  <div className="divide-y text-left">
                      {[
                          { bill: "INV-2900", entity: "Supplier: Globe Guards", amount: "₹1,24,000", match: "Matched", status: "Ready to Pay" },
                          { bill: "INV-2852", entity: "Supplier: Blue Tech", amount: "₹42,500", match: "Mismatch", status: "Investigating" },
                          { bill: "SAL-1021", entity: "Buyer: Lodha Park", amount: "₹2,05,000", match: "Matched", status: "Invoice Sent" },
                      ].map((item, i) => (
                          <div key={i} className="p-4 flex items-center justify-between group hover:bg-muted/20 transition-colors">
                              <div className="flex items-center gap-4">
                                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", item.match === "Matched" ? "bg-success/10 text-success" : "bg-critical/10 text-critical")}>
                                      <FileText className="h-5 w-5" />
                                  </div>
                                  <div className="flex flex-col">
                                      <div className="flex items-center gap-2">
                                          <span className="text-sm font-bold ">{item.bill}</span>
                                          <Badge variant="outline" className={cn("text-[8px] font-bold uppercase", item.match === "Matched" ? "bg-success/5 text-success border-success/20" : "bg-critical/5 text-critical border-critical/10 animate-pulse")}>{item.match}</Badge>
                                      </div>
                                      <span className="text-xs text-muted-foreground font-medium">{item.entity}</span>
                                  </div>
                              </div>
                              <div className="flex flex-col items-end">
                                  <span className="text-sm font-bold">{item.amount}</span>
                                  <span className="text-[10px] text-muted-foreground font-bold uppercase">{item.status}</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </CardContent>
          </Card>

          <div className="space-y-6">
              <Card className="border-none shadow-premium bg-linear-to-br from-slate-800 to-slate-900 text-white p-6">
                  <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold uppercase ">Tax Liability Summary</h3>
                          <Badge className="bg-white/10 text-white border-white/20 font-bold">Q1 2024</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-8 text-left">
                          <div>
                              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest text-left">GST Payable</p>
                              <p className="text-3xl font-bold mt-1">₹4.2L</p>
                          </div>
                          <div>
                              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest text-left">PF/ESIC Reserved</p>
                              <p className="text-3xl font-bold mt-1">₹8.1L</p>
                          </div>
                      </div>
                      <Button className="w-full bg-white text-slate-900 hover:bg-white/90 font-bold uppercase text-[10px] tracking-widest">View Detailed Tax Ledger</Button>
                  </div>
              </Card>

              <Card className="border-none shadow-card ring-1 ring-border p-5">
                  <div className="flex items-center gap-4 text-left">
                     <div className="h-12 w-12 rounded-2xl bg-warning/5 text-warning flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-bold text-critical">8 High-Value Conflicts</span>
                        <p className="text-xs font-medium text-muted-foreground">Supplier rates deviate from Master Contract by &gt;15%.</p>
                        <Button variant="link" className="p-0 h-auto text-[10px] font-bold uppercase text-primary mt-2 flex justify-start">Audit Conflicts Now</Button>
                     </div>
                  </div>
              </Card>
          </div>
      </div>
    </div>
  );
}
