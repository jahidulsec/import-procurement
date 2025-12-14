"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FormSheet } from "@/components/shared/sheet/sheet";
import UserForm from "./user-form";

export default function CreateUserButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusCircle /> Add User
      </Button>

      <FormSheet open={open} onOpenChange={setOpen} formTitle="Create User">
        <UserForm onClose={() => setOpen(false)} />
      </FormSheet>
    </>
  );
}
