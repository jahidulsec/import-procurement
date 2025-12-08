"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "../../../components/shared/inputs/password";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginType } from "../action/schema";
import { useRouter } from "@bprogress/next";
import { userLogin } from "../action/login";
import { toast } from "sonner";
import { user } from "@/lib/generated/prisma";
import { Asterisk } from "lucide-react";
import { ActionButton } from "@/components/shared/buttons/button";
import { Form } from "@/components/shared/form/form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      sap_id: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: LoginType) {
    const res = await userLogin(data);
    toast[res.success ? "success" : "error"](res.message);
    if (res.success) {
      router.replace("/dashboard");
    }
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your phone below to login to your account
          </p>
        </div>
        <Controller
          control={form.control}
          name="sap_id"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                SAP ID <Asterisk size={10} className="text-destructive" />
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="SAP ID"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Password <Asterisk size={10} className="text-destructive" />
              </FieldLabel>
              <PasswordInput
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="PASSWORD"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <ActionButton size={"lg"}>Login</ActionButton>
        </Field>
      </FieldGroup>
    </Form>
  );
}
