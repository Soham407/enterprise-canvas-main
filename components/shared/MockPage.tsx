"use client";

import { usePathname } from "next/navigation";
import { MoveRight, Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MockPage() {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) || [];
  const pageName = segments[segments.length - 1]?.replace(/-/g, " ");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center border-2 border-dashed border-primary/20">
         <Construction className="h-10 w-10 text-primary/40" />
      </div>
      <div>
        <h1 className="text-3xl font-bold capitalize ">{pageName || "System Module"}</h1>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          This interface for <span className="text-primary font-bold">/{pathname}</span> is currently under construction by the Enterprise Design Team.
        </p>
      </div>
      
      <Card className="max-w-md w-full border-none shadow-card ring-1 ring-border">
         <CardContent className="p-6">
            <h3 className="font-bold text-sm mb-4">Module Specification</h3>
            <ul className="text-left space-y-3">
               {[
                 "High-density TanStack data table",
                 "Role-based permission gating",
                 "Real-time mocked JSON synchronization",
                 "Premium enterprise typography"
               ].map((spec, i) => (
                 <li key={i} className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    {spec}
                 </li>
               ))}
            </ul>
            <Button className="w-full mt-6 gap-2">
               Request Implementation <MoveRight className="h-4 w-4" />
            </Button>
         </CardContent>
      </Card>
    </div>
  );
}
