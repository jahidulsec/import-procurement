"use client";

import * as React from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { usePathname, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "@bprogress/next";

const formatDateDB = (date: string | Date) => {
  return format(new Date(date), "yyyy-MM-dd");
};

export function DateRangePicker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: searchParams.has("start")
      ? new Date(searchParams.get("start") as string)
      : undefined,
    to: searchParams.has("end")
      ? new Date(searchParams.get("end") as string)
      : undefined,
  });

  return (
    <div className="flex flex-col gap-3 w-full sm:w-fit">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn(
              "w-full md:w-[250px] flex justify-between text-xs items-center",
              !dateRange ? "text-muted-foreground" : ""
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd LLL , yy")} -{" "}
                  {format(dateRange.to, "dd LLL, yy")}
                </>
              ) : (
                format(dateRange.from, "dd LLL, yy")
              )
            ) : (
              <span className="text-muted-foreground font-normal text-sm">
                Select a date range
              </span>
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(selectd) => {
              const params = new URLSearchParams(searchParams);
              if (selectd) {
                if (selectd.from) {
                  params.set("start", formatDateDB(selectd.from));
                } else {
                  params.delete("start");
                  params.delete("end");
                }

                if (selectd.to) {
                  params.set("end", formatDateDB(selectd.to));
                } else {
                  params.delete("end");
                }

                router.push(`${pathname}?${params.toString()}`);
              } else {
                if (searchParams.has("start")) {
                  params.delete("start");
                  params.delete("end");
                  router.push(`${pathname}?${params.toString()}`);
                }
              }
              setDateRange(selectd);
            }}
            className="rounded-lg border shadow-sm"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
