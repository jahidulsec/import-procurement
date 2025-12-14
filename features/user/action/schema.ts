import { QuerySchema } from "@/schema/query";
import z from "zod";

export const UserSchema = z.object({
    sap_id: z.string("Enter sap_id").min(3, "At least 3 characters"),
    password: z.string("Enter password").min(6, 'At least 6 characters'),
    role: z.enum(['superadmin', 'admin'], 'Select role')
})

export const UserResetPasswordSchema = z.object({
    password: z.string("Enter password").min(6, 'At least 6 characters'),
})

export const UserQuarySchema = QuerySchema.extend({
    role: z.enum(["superadmin", 'admin']).optional(),
})

export type UserQuarySchemaType = z.infer<typeof UserQuarySchema>

export type UserType = z.infer<typeof UserSchema>
export type UserResetPasswordType = z.infer<typeof UserResetPasswordSchema>