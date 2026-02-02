import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const roleTagVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border",
  {
    variants: {
      variant: {
        admin: "bg-primary/10 text-primary border-primary/20",
        manager: "bg-info/10 text-info border-info/20",
        supervisor: "bg-warning/10 text-warning border-warning/20",
        employee: "bg-muted text-muted-foreground border-border",
        guard: "bg-success/10 text-success border-success/20",
        buyer: "bg-chart-4/10 text-chart-4 border-chart-4/20",
        supplier: "bg-chart-3/10 text-chart-3 border-chart-3/20",
        default: "bg-secondary text-secondary-foreground border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface RoleTagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof roleTagVariants> {
  icon?: LucideIcon;
}

export function RoleTag({
  className,
  variant,
  icon: Icon,
  children,
  ...props
}: RoleTagProps) {
  return (
    <span className={cn(roleTagVariants({ variant, className }))} {...props}>
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
}

// Priority/Severity Tag
const priorityTagVariants = cva(
  "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
  {
    variants: {
      priority: {
        low: "bg-muted text-muted-foreground",
        medium: "bg-warning/10 text-warning",
        high: "bg-chart-5/10 text-chart-5",
        critical: "bg-critical/10 text-critical",
      },
    },
    defaultVariants: {
      priority: "low",
    },
  }
);

export interface PriorityTagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof priorityTagVariants> {}

export function PriorityTag({
  className,
  priority,
  children,
  ...props
}: PriorityTagProps) {
  const defaultLabels = {
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
  };

  return (
    <span className={cn(priorityTagVariants({ priority, className }))} {...props}>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          priority === "low" && "bg-muted-foreground",
          priority === "medium" && "bg-warning",
          priority === "high" && "bg-chart-5",
          priority === "critical" && "bg-critical animate-pulse"
        )}
      />
      {children || defaultLabels[priority || "low"]}
    </span>
  );
}
