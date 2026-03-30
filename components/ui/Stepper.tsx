"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="flex-1 relative flex flex-row md:flex-col items-start gap-4 md:gap-2">
            <div className="flex items-center w-full">
              <div
                className={cn(
                  "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  isCompleted
                    ? "border-success bg-success text-success-foreground"
                    : isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-background text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
              </div>
              
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "hidden md:block h-0.5 w-full mx-2 rounded-full",
                    isCompleted ? "bg-success" : "bg-muted"
                  )}
                />
              )}
            </div>
            
            <div className="flex flex-col pt-1 md:pt-0">
              <h4
                className={cn(
                  "text-sm font-semibold",
                  isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.title}
              </h4>
              {step.description && (
                <p className="text-sm text-muted-foreground">{step.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
