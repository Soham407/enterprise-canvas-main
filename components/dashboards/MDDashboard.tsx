"use client";

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";
import { TrendingUp, Users, Building2, Briefcase, DollarSign, Globe, Award, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const growthData = [
  { month: "Jan", revenue: 4.2 },
  { month: "Feb", revenue: 4.8 },
  { month: "Mar", revenue: 5.1 },
  { month: "Apr", revenue: 6.2 },
  { month: "May", revenue: 5.9 },
  { month: "Jun", revenue: 7.4 },
];

export function MDDashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold ">Strategic Hub (Company MD)</h1>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Enterprise growth, top clients, and financial health.</p>
        </div>
        <div className="flex gap-2">
           <Button className="gap-2 font-bold shadow-lg shadow-primary/20 bg-primary">
               <Globe className="h-4 w-4" /> Global Reporting
           </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
          {[
              { label: "Annual Revenue", value: "₹84.2M", change: "+14.2%", icon: DollarSign, bg: "bg-success" },
              { label: "Active Societies", value: "142", change: "+8 new", icon: Building2, bg: "bg-primary" },
              { label: "Client Retention", value: "98.4%", change: "Strategic top", icon: Award, bg: "bg-info" },
              { label: "Force Strength", value: "4.2k", change: "+120 hires", icon: Users, bg: "bg-warning" },
          ].map((stat, i) => (
              <Card key={i} className="border-none shadow-card ring-1 ring-border p-4 bg-muted/20 premium-card-hover cursor-pointer group">
                  <div className="flex items-center gap-4 text-left">
                      <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-black/5 text-white", stat.bg)}>
                          <stat.icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                          <span className="text-xl font-bold">{stat.value}</span>
                          <span className="text-[11px] font-black uppercase text-muted-foreground tracking-widest leading-none mt-1">{stat.label}</span>
                          <span className="text-xs font-bold text-success mt-1">{stat.change}</span>
                      </div>
                  </div>
              </Card>
          ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-none shadow-card ring-1 ring-border">
              <CardHeader className="bg-muted/5 border-b pb-6">
                   <div className="flex items-center justify-between">
                       <div>
                           <CardTitle className="text-base font-bold uppercase ">Growth Forecast (FY 2024-25)</CardTitle>
                           <CardDescription className="text-xs">Consolidated revenue trends across all modules.</CardDescription>
                       </div>
                       <Badge variant="outline" className="font-bold border-success/20 text-success">PROJECTED +22%</Badge>
                   </div>
              </CardHeader>
              <CardContent className="pt-8">
                  <div className="h-[300px] w-full">
                    {mounted ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={growthData}>
                          <defs>
                            <linearGradient id="colorMd" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} tickFormatter={(v) => `₹${v}M`} />
                          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                          <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorMd)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full w-full bg-muted/5 animate-pulse rounded-xl" />
                    )}
                  </div>
              </CardContent>
          </Card>

          <div className="space-y-6">
              <Card className="border-none shadow-premium bg-linear-to-br from-indigo-600 to-indigo-800 text-white p-6">
                  <div className="flex flex-col gap-6 text-left">
                      <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                          <h3 className="text-lg font-bold uppercase ">Compliance Score</h3>
                          <p className="text-xs text-indigo-100/70 font-medium">PSARA & ESIC standards met across all sites.</p>
                      </div>
                      <div className="text-4xl font-bold">100%</div>
                      <Button className="w-full bg-white text-indigo-900 hover:bg-white/90 font-bold uppercase text-xs tracking-widest mt-2 h-10">Audit History</Button>
                  </div>
              </Card>

              <Card className="border-none shadow-card ring-1 ring-border p-5 premium-card-hover group cursor-pointer">
                  <div className="flex flex-col gap-4 text-left">
                      <span className="text-[11px] font-black uppercase text-muted-foreground tracking-widest leading-none">Top Revenue Client</span>
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <Building2 className="h-5 w-5 text-primary" />
                              <span className="text-sm font-bold">Lodha Altis</span>
                          </div>
                          <span className="text-sm font-bold">₹4.2M / Yr</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[85%]" />
                      </div>
                  </div>
              </Card>
          </div>
      </div>
    </div>
  );
}
