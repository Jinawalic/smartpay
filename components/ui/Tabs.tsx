"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn("inline-flex flex-wrap items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground min-h-[40px] h-auto w-full", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={(e) => {
             e.preventDefault();
             onTabChange(tab);
          }}
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            activeTab === tab 
              ? "bg-background text-foreground shadow-sm" 
              : "hover:bg-background/50 hover:text-foreground"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
