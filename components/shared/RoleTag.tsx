import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface RoleTagProps {
  role: string;
  className?: string;
}

export function RoleTag({ role, className }: RoleTagProps) {
  const getRoleColor = (r: string) => {
    switch (r.toLowerCase()) {
      case "admin":
      case "super admin":
        return "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "manager":
        return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "buyer":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300";
      case "supplier":
        return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300";
      case "guard":
      case "security":
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("px-2 py-0 text-[10px] font-bold uppercase tracking-wider", getRoleColor(role), className)}
    >
      {role}
    </Badge>
  );
}
