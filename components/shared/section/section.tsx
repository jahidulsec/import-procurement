import { cn } from "@/lib/utils";
import React from "react";

const DashboardSection = ({
  className,
  ...props
}: React.ComponentProps<"section">) => {
  return (
    <section
      className={cn("w-[calc(100vw - var(--sidebar-width))] px-4", className)}
      {...props}
    />
  );
};

export { DashboardSection };
