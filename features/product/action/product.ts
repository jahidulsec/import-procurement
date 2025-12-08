"use server"

import { handleError } from "@/lib/error"
import { response } from "@/lib/response"
import { revalidatePath } from "next/cache"
import { ProductType } from "./schema"
import { db } from "@/config/db"

export const createProduct = async (data: ProductType) => {
    try {
        const product = await db.product.create({
            data: data,
        })

        revalidatePath('/dashboard')
        revalidatePath(`/dashboard/product`)

        return response({ success: true, message: "New product is created successfully", data: product })

    } catch (error) {
        console.error(error)
        const err = handleError(error)
        return response({ success: false, message: err.message ?? 'Something went wrong' })
    }
}

export const updateProduct = async (id: string, data: ProductType) => {
    try {
        const product = await db.product.update({
            where: { id },
            data: data,
        })

        revalidatePath('/dashboard')
        revalidatePath(`/dashboard/product`)


        return response({ success: true, message: "Product is updated successfully", data: product })

    } catch (error) {
        console.error(error)
        const err = handleError(error)
        return response({ success: false, message: err.message ?? 'Something went wrong' })
    }
}

export const deleteProduct = async (id: string) => {
    try {
        const product = await db.product.delete({
            where: { id },
        })

        revalidatePath('/dashboard')
        revalidatePath(`/dashboard/product`)


        return response({ success: true, message: "Product is deleted successfully", data: product })

    } catch (error) {
        console.error(error)
        const err = handleError(error)
        return response({ success: false, message: err.message ?? 'Something went wrong' })
    }
}