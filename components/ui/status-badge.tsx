import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusBadgeVariants = cva(
  "status-badge",
  {
    variants: {
      variant: {
        success: "bg-success/10 text-success border border-success/20",
        warning: "bg-warning/10 text-warning border border-warning/20",
        critical: "bg-critical/10 text-critical border border-critical/20",
        info: "bg-info/10 text-info border border-info/20",
        pending: "bg-muted text-muted-foreground border border-border",
        default: "bg-secondary text-secondary-foreground border border-border",
      },
      size: {
        sm: "text-2xs px-2 py-0.5",
        default: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  dot?: boolean;
}

const statusDotColors: Record<string, string> = {
  success: "bg-success",
  warning: "bg-warning",
  critical: "bg-critical",
  info: "bg-info",
  pending: "bg-muted-foreground",
  default: "bg-muted-foreground",
};

export function StatusBadge({
  className,
  variant,
  size,
  dot = true,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={cn(statusBadgeVariants({ variant, size, className }))}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            statusDotColors[variant || "default"]
          )}
        />
      )}
      {children}
    </span>
  );
}

// Convenience exports for common statuses
export function ApprovedBadge({ children = "Approved", ...props }: Omit<StatusBadgeProps, "variant">) {
  return <StatusBadge variant="success" {...props}>{children}</StatusBadge>;
}

export function PendingBadge({ children = "Pending", ...props }: Omit<StatusBadgeProps, "variant">) {
  return <StatusBadge variant="pending" {...props}>{children}</StatusBadge>;
}

export function RejectedBadge({ children = "Rejected", ...props }: Omit<StatusBadgeProps, "variant">) {
  return <StatusBadge variant="critical" {...props}>{children}</StatusBadge>;
}

export function InProgressBadge({ children = "In Progress", ...props }: Omit<StatusBadgeProps, "variant">) {
  return <StatusBadge variant="info" {...props}>{children}</StatusBadge>;
}

export function WarningBadge({ children = "Warning", ...props }: Omit<StatusBadgeProps, "variant">) {
  return <StatusBadge variant="warning" {...props}>{children}</StatusBadge>;
}
