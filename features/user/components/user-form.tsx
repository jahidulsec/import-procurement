"use client";

import { Form } from "@/components/shared/form/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormButton } from "@/components/shared/buttons/button";
import { user } from "@/lib/generated/prisma";
import { toast } from "sonner";
import { UserSchema, UserType } from "../action/schema";
import { PasswordInput } from "@/components/shared/inputs/password";
import { createUser, updateUser } from "../action/user";

export default function UserForm({
  prevData,
  onClose,
}: {
  prevData?: user;
  onClose?: () => void;
}) {
  const form = useForm<UserType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      sap_id: prevData?.sap_id,
      role: prevData?.role ?? "admin",
      password: prevData?.password,
    },
  });

  async function onSubmit(data: UserType) {
    const res = prevData
      ? await updateUser(prevData?.sap_id ?? "", data)
      : await createUser(data);

    toast[res.success ? "success" : "error"](res.message);

    if (res.success) {
      onClose?.();
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="sap_id"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>SAP ID</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="eg. 10001"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {!prevData && (
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <PasswordInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="XXX XXX XXX"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        <FormButton type="submit" className={!onClose ? "w-fit min-w-[18rem]" : ''} isPending={form.formState.isSubmitting}>
          Save
        </FormButton>
      </FieldGroup>
    </form>
  );
}
