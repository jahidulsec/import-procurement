import { QuerySchema } from "@/schema/query";
import z from "zod";

export const ProductSchema = z.object({
    party_name: z.string("Enter party name").min(2, "At least 2 characters"),
    invoice: z.string("Enter Invoice number").optional(),
    lc_no: z.string("Enter L/C number").min(2, "At least 2 characters"),
    remarks: z.string("Enter remarks").optional(),
    other_remarks: z.string("Enter other remarks").optional(),
    comment: z.string("Enter status comment").optional(),
    status: z.enum(['lc_pending', 'lc_done', 'in_transit', 'at_port', 'delivered'], 'Select status'),
    amount: z.number('Enter valid amount').optional()
})

export const ProductQuarySchema = QuerySchema.extend({
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    status: z.enum(['lc_pending', 'lc_done', 'in_transit', 'at_port', 'delivered'], 'Select status').optional(),
})

export type ProductQuarySchemaType = z.infer<typeof ProductQuarySchema>

export type ProductType = z.infer<typeof ProductSchema>