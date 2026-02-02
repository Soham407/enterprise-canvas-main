import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  title: string;
  description?: string;
  status: "complete" | "current" | "upcoming";
  date?: string;
}

interface StepperTimelineProps {
  steps: Step[];
  className?: string;
}

export function StepperTimeline({ steps, className }: StepperTimelineProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {steps.map((step, index) => (
        <div key={index} className="relative flex gap-4">
          {/* Connector Line */}
          {index !== steps.length - 1 && (
            <div 
              className={cn(
                "absolute left-4 top-10 h-[calc(100%-1.5rem)] w-[2px]",
                step.status === "complete" ? "bg-primary" : "bg-border"
              )} 
            />
          )}
          
          {/* Icon/Circle */}
          <div className="relative z-10 flex h-8 w-8 items-center justify-center">
            {step.status === "complete" ? (
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 animate-in zoom-in">
                <Check className="h-4 w-4 text-white" />
              </div>
            ) : step.status === "current" ? (
              <div className="h-8 w-8 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full border-2 border-border bg-muted/30" />
            )}
          </div>
          
          {/* Content */}
          <div className="flex flex-col pt-1">
            <span className={cn(
              "text-sm font-bold ",
              step.status === "complete" ? "text-foreground" : 
              step.status === "current" ? "text-primary" : "text-muted-foreground"
            )}>
              {step.title}
            </span>
            {step.description && (
              <span className="text-xs text-muted-foreground mt-1 max-w-sm leading-relaxed">{step.description}</span>
            )}
            {step.date && (
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase mt-2 tracking-widest">{step.date}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
