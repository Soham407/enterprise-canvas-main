import { cn } from "@/lib/utils";
import { Check, Circle, Clock } from "lucide-react";

export interface StepperStep {
  id: string;
  title: string;
  description?: string;
  status: "completed" | "current" | "upcoming";
  date?: string;
  user?: string;
}

interface StepperTimelineProps {
  steps: StepperStep[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function StepperTimeline({
  steps,
  orientation = "vertical",
  className,
}: StepperTimelineProps) {
  if (orientation === "horizontal") {
    return (
      <div className={cn("flex items-center justify-between", className)}>
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <StepIcon status={step.status} />
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.status === "completed" && "text-success",
                    step.status === "current" && "text-primary",
                    step.status === "upcoming" && "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {step.date && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.date}
                  </p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4",
                  step.status === "completed" ? "bg-success" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, index) => (
        <div key={step.id} className="relative flex gap-4">
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                "absolute left-[15px] top-8 w-0.5 h-[calc(100%-8px)]",
                step.status === "completed" ? "bg-success" : "bg-border"
              )}
            />
          )}

          {/* Step Icon */}
          <div className="relative z-10 pt-1">
            <StepIcon status={step.status} />
          </div>

          {/* Step Content */}
          <div className="pb-6 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p
                  className={cn(
                    "font-medium",
                    step.status === "completed" && "text-success",
                    step.status === "current" && "text-foreground",
                    step.status === "upcoming" && "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {step.description}
                  </p>
                )}
              </div>
              <div className="text-right">
                {step.date && (
                  <p className="text-xs text-muted-foreground">{step.date}</p>
                )}
                {step.user && (
                  <p className="text-xs text-muted-foreground">{step.user}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepIcon({ status }: { status: StepperStep["status"] }) {
  const baseClasses =
    "flex h-8 w-8 items-center justify-center rounded-full border-2";

  if (status === "completed") {
    return (
      <div className={cn(baseClasses, "border-success bg-success text-success-foreground")}>
        <Check className="h-4 w-4" />
      </div>
    );
  }

  if (status === "current") {
    return (
      <div className={cn(baseClasses, "border-primary bg-primary/10")}>
        <Clock className="h-4 w-4 text-primary" />
      </div>
    );
  }

  return (
    <div className={cn(baseClasses, "border-border bg-muted")}>
      <Circle className="h-3 w-3 text-muted-foreground" />
    </div>
  );
}
