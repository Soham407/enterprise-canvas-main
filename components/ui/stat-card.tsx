import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const statCardVariants = cva(
  "stat-card relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-medium",
  {
    variants: {
      variant: {
        default: "bg-card",
        primary: "bg-card before:bg-gradient-to-r before:from-primary before:to-accent",
        success: "bg-card before:bg-success",
        warning: "bg-card before:bg-warning",
        critical: "bg-card before:bg-critical",
        info: "bg-card before:bg-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label?: string;
    isPositive?: boolean;
  };
  loading?: boolean;
}

export function StatCard({
  className,
  variant,
  title,
  value,
  description,
  icon: Icon,
  trend,
  loading,
  ...props
}: StatCardProps) {
  if (loading) {
    return (
      <div className={cn(statCardVariants({ variant, className }))} {...props}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            <div className="h-8 w-32 rounded bg-muted animate-pulse" />
            <div className="h-3 w-20 rounded bg-muted animate-pulse" />
          </div>
          <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(statCardVariants({ variant, className }))} {...props}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold  text-foreground">
            {value}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 pt-1">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-success" : "text-critical"
                )}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
              {trend.label && (
                <span className="text-xs text-muted-foreground">
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}

// Mini stat card for compact displays
export function MiniStatCard({
  title,
  value,
  icon: Icon,
  className,
}: {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 rounded-lg border bg-card p-4", className)}>
      {Icon && (
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      <div>
        <p className="text-lg font-semibold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{title}</p>
      </div>
    </div>
  );
}
