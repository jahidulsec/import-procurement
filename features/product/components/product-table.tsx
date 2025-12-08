"use client";

import { FormSheet } from "@/components/shared/sheet/sheet";
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
import { Edit, Eye, Trash } from "lucide-react";
import React from "react";
import ProductForm from "./product-form";
import AlertModal from "@/components/shared/alert-dialog/alert-dialog";
import { toast } from "sonner";
import { deleteProduct } from "../action/product";

export default function ProductTable({ data }: { data: product[] }) {
  const [view, setView] = React.useState<product | boolean>(false);
  const [del, setDel] = React.useState<string | boolean>(false);

  const [pending, startTransition] = React.useTransition();

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
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === "delivered" ? "success" : "secondary"
          }
        >
          {row.original.status}
        </Badge>
      ),
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
                  onClick={() => setView(value)}
                >
                  <Edit /> <span className="sr-only">Edit</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={pending}
                  variant={"outline"}
                  size={"icon-sm"}
                  className="text-destructive"
                  onClick={() => setDel(value.id)}
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

  return (
    <>
      <DataTable columns={columns} data={data} />

      <FormSheet
        open={!!view}
        onOpenChange={setView}
        formTitle="Import Procurement"
      >
        <ProductForm
          prevData={typeof view !== "boolean" ? view : undefined}
          onClose={() => setView(false)}
        />
      </FormSheet>

      <AlertModal
        open={!!del}
        onOpenChange={setDel}
        onAction={() => {
          startTransition(async () => {
            toast.promise(deleteProduct(typeof del !== "boolean" ? del : ""), {
              loading: "Deleting",
              success: (data) => {
                if (!data.success) throw data;
                return data.message;
              },
              error: (data) => {
                return data.message;
              },
            });
          });
        }}
      />
    </>
  );
}
