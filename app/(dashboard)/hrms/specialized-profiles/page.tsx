"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { 
  ShieldAlert, 
  Target, 
  Eye, 
  UserCheck, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  MoreHorizontal,
  Wrench,
  Camera,
  MapPin,
  Fingerprint,
  Award,
  BookOpen
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function SpecializedProfilesPage() {
  return (
    <div className="animate-fade-in space-y-8 pb-10">
      <PageHeader
        title="Specialized Personnel Profiles"
        description="High-security roles requiring ballistic training, surveillance certifications, and enhanced background vetting."
        actions={
          <Button className="gap-2 shadow-sm">
            <Award className="h-4 w-4" /> Verify Credentials
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Specialized Profile 1: Gunman */}
        <Card className="border-none shadow-card ring-1 ring-border group hover:ring-critical/20 transition-all">
             <CardHeader className="p-6 pb-2">
                 <div className="flex items-center justify-between mb-4">
                     <Badge variant="outline" className="bg-critical/5 text-critical border-critical/20 font-bold text-[10px] uppercase">Gunman - Level 3</Badge>
                     <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                 </div>
                 <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-background ring-2 ring-primary/5 shadow-xl">
                        <AvatarFallback className="bg-muted text-lg font-bold">VS</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left">
                        <CardTitle className="text-xl font-bold ">Vikram Singh</CardTitle>
                        <CardDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Arms License: UP-1024-XB</CardDescription>
                    </div>
                 </div>
             </CardHeader>
             <CardContent className="p-6 pt-6 border-t border-dashed mt-4 space-y-4">
                 <div className="grid grid-cols-3 gap-2">
                    {[
                        { label: "Vetting", icon: UserCheck, val: "Pass" },
                        { label: "Firearm", icon: Target, val: ".32 Revolver" },
                        { label: "Exp", icon: Calendar, val: "8Y" },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center p-2 rounded-lg bg-muted/30">
                            <item.icon className="h-3.5 w-3.5 text-muted-foreground mb-1" />
                            <span className="text-[10px] font-bold uppercase text-foreground">{item.val}</span>
                            <span className="text-[8px] font-bold text-muted-foreground uppercase">{item.label}</span>
                        </div>
                    ))}
                 </div>
                 <Button className="w-full bg-critical hover:bg-critical/90 shadow-lg shadow-critical/20">View Detailed Dossier</Button>
             </CardContent>
        </Card>

        {/* Specialized Profile 2: CCTV Analyst */}
        <Card className="border-none shadow-card ring-1 ring-border group hover:ring-info/20 transition-all">
             <CardHeader className="p-6 pb-2">
                 <div className="flex items-center justify-between mb-4">
                     <Badge variant="outline" className="bg-info/5 text-info border-info/20 font-bold text-[10px] uppercase">Surveillance Expert</Badge>
                     <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                 </div>
                 <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-background ring-2 ring-primary/5 shadow-xl">
                        <AvatarFallback className="bg-muted text-lg font-bold">AM</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left">
                        <CardTitle className="text-xl font-bold ">Anjali Mehta</CardTitle>
                        <CardDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Cert: VMS-Expert-24</CardDescription>
                    </div>
                 </div>
             </CardHeader>
             <CardContent className="p-6 pt-6 border-t border-dashed mt-4 space-y-4">
                 <div className="grid grid-cols-3 gap-2">
                    {[
                        { label: "Visual Vetting", icon: Eye, val: "100%" },
                        { label: "VMS Skill", icon: Camera, val: "Milestone" },
                        { label: "Exp", icon: Calendar, val: "4Y" },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center p-2 rounded-lg bg-muted/30">
                            <item.icon className="h-3.5 w-3.5 text-muted-foreground mb-1" />
                            <span className="text-[10px] font-bold uppercase text-foreground">{item.val}</span>
                            <span className="text-[8px] font-bold text-muted-foreground uppercase">{item.label}</span>
                        </div>
                    ))}
                 </div>
                 <Button className="w-full bg-info hover:bg-info/90 shadow-lg shadow-info/20">View System Access Log</Button>
             </CardContent>
        </Card>

        {/* Specialized Profile 3: Bouncer / Close Protection */}
        <Card className="border-none shadow-card ring-1 ring-border group hover:ring-primary/20 transition-all border-l-4 border-l-primary/10">
             <CardHeader className="p-6 pb-2">
                 <div className="flex items-center justify-between mb-4">
                     <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold text-[10px] uppercase">Tactical Support</Badge>
                     <div className="h-2 w-2 rounded-full bg-warning animate-pulse" />
                 </div>
                 <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-background ring-2 ring-primary/5 shadow-xl">
                        <AvatarFallback className="bg-muted text-lg font-bold">MK</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left">
                        <CardTitle className="text-xl font-bold ">Manoj Kumar</CardTitle>
                        <CardDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Code: ALPHA-GARD</CardDescription>
                    </div>
                 </div>
             </CardHeader>
             <CardContent className="p-6 pt-6 border-t border-dashed mt-4 space-y-4">
                 <div className="grid grid-cols-3 gap-2">
                    {[
                        { label: "Combat", icon: ShieldAlert, val: "L3" },
                        { label: "Vetting", icon: UserCheck, val: "A+" },
                        { label: "Exp", icon: Calendar, val: "12Y" },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center p-2 rounded-lg bg-muted/30">
                            <item.icon className="h-3.5 w-3.5 text-muted-foreground mb-1" />
                            <span className="text-[10px] font-bold uppercase text-foreground">{item.val}</span>
                            <span className="text-[8px] font-bold text-muted-foreground uppercase">{item.label}</span>
                        </div>
                    ))}
                 </div>
                 <Button className="w-full shadow-lg">Request Deployment</Button>
             </CardContent>
        </Card>
      </div>

      <div className="p-8 text-center border-2 border-dashed rounded-3xl bg-muted/20">
            <ShieldAlert className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold">Certification Compliance Vault</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto mt-2">All specialized personnel must undergo annual arms license verification and psychological vetting. Documents are encrypted and stored in the HR Governance portal.</p>
            <div className="flex justify-center gap-4 mt-6">
                <Badge variant="secondary" className="gap-2 px-3 py-1 font-bold"> <Fingerprint className="h-3.5 w-3.5 text-primary" /> biometric Verified</Badge>
                <Badge variant="secondary" className="gap-2 px-3 py-1 font-bold"> <BookOpen className="h-3.5 w-3.5 text-info" /> background Clear</Badge>
            </div>
      </div>
    </div>
  );
}
