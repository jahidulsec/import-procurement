"use client";

import { Form } from "@/components/shared/form/form";
import { ProductSchema, ProductType } from "../action/schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/shared/select/select";
import { FormButton } from "@/components/shared/buttons/button";
import { product } from "@/lib/generated/prisma";
import { createProduct, updateProduct } from "../action/product";
import { toast } from "sonner";

export default function ProductForm({
  prevData,
  onClose,
}: {
  prevData?: product;
  onClose: () => void;
}) {
  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      party_name: prevData?.party_name,
      invoice: prevData?.invoice ?? undefined,
      lc_no: prevData?.lc_no,
      remarks: prevData?.remarks ?? undefined,
      comment: prevData?.comment ?? undefined,
      other_remarks: prevData?.other_remarks ?? undefined,
      status: prevData?.status ?? "pending",
    },
  });

  async function onSubmit(data: ProductType) {
    const res = prevData
      ? await updateProduct(prevData?.id ?? "", data)
      : await createProduct(data);

    toast[res.success ? "success" : "error"](res.message);

    if (res.success) {
      onClose();
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="party_name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Party Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Party Name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="invoice"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Proforma Invoice</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Invoice No."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="lc_no"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>L/C Number</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="L/C No."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="remarks"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Remarks</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Remarks"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="other_remarks"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Additional Remarks</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Additional"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="comment"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Comments</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Commnet"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="status"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Status</FieldLabel>
              <Select
                value={field.value}
                defaultValue={prevData?.status}
                onValueChange={(value) => field.onChange(value)}
                data={[
                  {
                    label: "Pending",
                    value: "pending",
                  },
                  {
                    label: "Delivered",
                    value: "delivered",
                  },
                ]}
                aria-invalid={fieldState.invalid}
                placeholder="Select Status"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FormButton type="submit" isPending={form.formState.isSubmitting}>
          Save
        </FormButton>
      </FieldGroup>
    </form>
  );
}
