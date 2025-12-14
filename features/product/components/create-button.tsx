"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FormSheet } from "@/components/shared/sheet/sheet";
import ProductForm from "./product-form";

export default function CreateProductButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusCircle /> Create Product
      </Button>

      <FormSheet open={open} onOpenChange={setOpen} formTitle="Create Product">
        <ProductForm onClose={() => setOpen(false)} />
      </FormSheet>
    </>
  );
}
