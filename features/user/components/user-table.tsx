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
import { user } from "@/lib/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Edit, Trash, UserLock } from "lucide-react";
import React from "react";
import AlertModal from "@/components/shared/alert-dialog/alert-dialog";
import { toast } from "sonner";
import { deleteUser } from "../action/user";
import UserForm from "./user-form";
import ResetPasswordForm from "./reset-password-form";

export default function UserTable({ data }: { data: user[] }) {
  const [view, setView] = React.useState<user | boolean>(false);
  const [resetPasword, setResetPasword] = React.useState<string | boolean>(
    false
  );
  const [del, setDel] = React.useState<string | boolean>(false);

  const [pending, startTransition] = React.useTransition();

  const columns: ColumnDef<user>[] = [
    {
      accessorKey: "sap_id",
      header: "SAP ID",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <Badge variant={"outline"}>{row.original.role}</Badge>,
    },
    {
      accessorKey: "created_at",
      header: "Date Time (Created)",
      cell: ({ row }) => (
        <p>
          {format(row.original.created_at as Date, "LLL dd, yyyy - h:mm aaa")}
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
                  variant={"outline"}
                  size={"icon-sm"}
                  className="text-secondary"
                  onClick={() => setResetPasword(value.sap_id)}
                >
                  <UserLock /> <span className="sr-only">Reset Password</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset Password</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={pending}
                  variant={"outline"}
                  size={"icon-sm"}
                  className="text-destructive"
                  onClick={() => setDel(value.sap_id)}
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

      <FormSheet open={!!view} onOpenChange={setView} formTitle="Edit User">
        <UserForm
          prevData={typeof view !== "boolean" ? view : undefined}
          onClose={() => setView(false)}
        />
      </FormSheet>

      <FormSheet
        open={!!resetPasword}
        onOpenChange={setResetPasword}
        formTitle="Reset Password"
      >
        <ResetPasswordForm
          id={typeof resetPasword !== "boolean" ? resetPasword : ""}
          onClose={() => setResetPasword(false)}
        />
      </FormSheet>

      <AlertModal
        open={!!del}
        onOpenChange={setDel}
        onAction={() => {
          startTransition(async () => {
            toast.promise(deleteUser(typeof del !== "boolean" ? del : ""), {
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
