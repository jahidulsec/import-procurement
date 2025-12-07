import { Loader } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="text-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-lg">
        <Loader className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">Import Procurement</span>
      </div>
    </div>
  );
};

export { Logo };
