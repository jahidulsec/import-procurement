import z from "zod";

export const ProductSchema = z.object({
    party_name: z.string("Enter party name").min(2, "At least 2 characters"),
    invoice: z.string("Enter Invoice number").optional(),
    lc_no: z.string("Enter L/C number").min(2, "At least 2 characters"),
    remarks: z.string("Enter remarks").optional(),
    other_remarks: z.string("Enter other remarks").optional(),
    comment: z.string("Enter status comment").optional(),
    status: z.enum(['pending', 'delivered'], 'Select status')
})

export type ProductType = z.infer<typeof ProductSchema>