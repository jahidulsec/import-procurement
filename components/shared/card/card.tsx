import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/formatter";
import { LucideIcon } from "lucide-react";
import React from "react";

const DashbaordCard = (item: {
  icon: LucideIcon;
  title: string;
  amount: number;
  className?: string;
}) => {
  return (
    <div className={"flex flex-col gap-2 border rounded-md p-4"}>
      {/* icon */}
      <div
        className={cn(
          "bg-primary/10 text-primary [&>svg]:size-6 p-1 w-fit aspect-square rounded-md",
          item.className
        )}
      >
        <item.icon />
      </div>

      {/* title */}
      <h2>{item.title}</h2>
      <p className="text-xl font-semibold">{formatNumber(item.amount)}</p>
    </div>
  );
};

export { DashbaordCard };
