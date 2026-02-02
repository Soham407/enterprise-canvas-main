import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload, Filter, RefreshCw } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({
  title,
  description,
  children,
  actions,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="border-b bg-card/50">
      <div className="page-container py-4">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-2">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  {crumb.href ? (
                    <a href={crumb.href} className="hover:text-foreground transition-colors">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-foreground">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="module-header mb-0">
            <h1 className="module-title">{title}</h1>
            {description && (
              <p className="module-description">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}

// Common action button patterns
export function CreateButton({
  children = "Create New",
  onClick,
  className,
}: {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button onClick={onClick} className={cn("gap-2", className)}>
      <Plus className="h-4 w-4" />
      {children}
    </Button>
  );
}

export function ExportButton({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button variant="outline" onClick={onClick} className={cn("gap-2", className)}>
      <Download className="h-4 w-4" />
      Export
    </Button>
  );
}

export function ImportButton({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button variant="outline" onClick={onClick} className={cn("gap-2", className)}>
      <Upload className="h-4 w-4" />
      Import
    </Button>
  );
}

export function FilterButton({
  onClick,
  active,
  className,
}: {
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn("gap-2", active && "border-primary text-primary", className)}
    >
      <Filter className="h-4 w-4" />
      Filters
    </Button>
  );
}

export function RefreshButton({
  onClick,
  loading,
  className,
}: {
  onClick?: () => void;
  loading?: boolean;
  className?: string;
}) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} className={className}>
      <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
    </Button>
  );
}
