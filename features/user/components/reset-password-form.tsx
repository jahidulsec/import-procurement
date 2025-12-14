"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { FormButton } from "@/components/shared/buttons/button";
import { toast } from "sonner";
import {
  UserResetPasswordSchema,
  UserResetPasswordType,
} from "../action/schema";
import { PasswordInput } from "@/components/shared/inputs/password";
import { userResetPassword } from "../action/user";

export default function ResetPasswordForm({
  id,
  onClose,
}: {
  id: string;
  onClose?: () => void;
}) {
  const form = useForm<UserResetPasswordType>({
    resolver: zodResolver(UserResetPasswordSchema),
  });

  async function onSubmit(data: UserResetPasswordType) {
    const res = await userResetPassword(id, data);

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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FormButton type="submit" className={!onClose ? "w-fit min-w-[18rem]" : ""} isPending={form.formState.isSubmitting}>
          Save
        </FormButton>
      </FieldGroup>
    </form>
  );
}
