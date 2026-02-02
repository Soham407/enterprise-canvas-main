import { cn } from "@/lib/utils";

export type StatusType = "success" | "pending" | "error" | "info" | "warning";

interface StatusBadgeProps {
  status: StatusType | string;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const getStatusStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case "success":
      case "approved":
      case "paid":
      case "active":
        return "bg-success/10 text-success border-success/20";
      case "pending":
      case "in progress":
      case "draft":
        return "bg-warning/10 text-warning border-warning/20";
      case "error":
      case "rejected":
      case "failed":
      case "critical":
        return "bg-critical/10 text-critical border-critical/20";
      case "info":
      case "new":
        return "bg-info/10 text-info border-info/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <span
      className={cn(
        "status-badge border",
        getStatusStyles(status),
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
      {label || status}
    </span>
  );
}
