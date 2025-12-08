"use client";

import { DataTable } from "@/components/shared/table/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { product } from "@/lib/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, Trash } from "lucide-react";
import React from "react";

export default function ProductTable({ data }: { data: product[] }) {
  const columns: ColumnDef<product>[] = [
    {
      accessorKey: "created_at",
      header: "Date Time",
      cell: ({ row }) => (
        <p>
          {format(row.original.created_at as Date, "LLL dd, yyyy - h:mm aaa")}
        </p>
      ),
    },
    {
      accessorKey: "party_name",
      header: "Party Name",
    },
    {
      accessorKey: "invoice",
      header: "Proforma Invoice",
    },
    {
      accessorKey: "lc_no",
      header: "L/C no",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell:({row}) => <Badge variant={row.original.status === 'delivered' ? 'success' : 'secondary'}>{row.original.status}</Badge>
    },
    {
      accessorKey: "comment",
      header: "Comment",
      cell: ({ row }) => (
        <p>
          {row.original.comment
            ? `${row.original.comment} at ${format(
                row.original.updated_at as Date,
                "LLL dd, yyyy - h:mm aaa"
              )}`
            : "-"}
        </p>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const value = row.original;

        return (
          <div className="flex items-center gap-1 justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"icon-sm"}
                  className="text-primary"
                >
                  <Eye /> <span className="sr-only">View</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"icon-sm"}
                  className="text-destructive"
                >
                  <Trash /> <span className="sr-only">Delete</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
