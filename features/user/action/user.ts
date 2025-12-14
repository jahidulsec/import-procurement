"use server"

import { handleError } from "@/lib/error"
import { response } from "@/lib/response"
import { revalidatePath } from "next/cache"
import { db } from "@/config/db"
import { UserResetPasswordType, UserType } from "./schema"
import { hashPassword } from "@/utils/password"

export const createUser = async (data: UserType) => {
    try {
        const user = await db.user.create({
            data: {
                sap_id: data.sap_id,
                password: await hashPassword(data.password),
                role: data.role
            },
        })

        revalidatePath('/dashboard')
        revalidatePath(`/dashboard/user`)

        return response({ success: true, message: "New user is created successfully", data: user })

    } catch (error) {
        console.error(error)
        const err = handleError(error)
        return response({ success: false, message: err.message ?? 'Something went wrong' })
    }
}

export const updateUser = async (id: string, data: UserType) => {
    try {
        const user = await db.user.update({
            where: { sap_id: id },
            data: {
                sap_id: data.sap_id,
                role: data.role
            },

        })

        revalidatePath('/dashboard')
        revalidatePath(`/dashboard/user`)


        return response({ success: true, message: "User is updated successfully", data: user })

    } catch (error) {
        console.error(error)
        const err = handleError(error)
        return response({ success: false, message: err.message ?? 'Something went wrong' })
    }
}

export const userResetPassword = async (id: string, data: UserResetPasswordType) => {
    try {
        const user = await db.user.update({
            where: { sap_id: id },
            data: {
                password: await hashPassword(data.password)
            },

        })

        revalidatePath('/dashboard')
        revalidatePath(`/dashboard/user`)


        return response({ success: true, message: "User password is updated successfully", data: user })

    } catch (error) {
        console.error(error)
        const err = handleError(error)
        return response({ success: false, message: err.message ?? 'Something went wrong' })
    }
}

export const deleteUser = async (id: string) => {
    try {
        const user = await db.user.delete({
            where: { sap_id: id },
        })

        revalidatePath('/dashboard')
        revalidatePath(`/dashboard/user`)


        return response({ success: true, message: "User is deleted successfully", data: user })

    } catch (error) {
        console.error(error)
        const err = handleError(error)
        return response({ success: false, message: err.message ?? 'Something went wrong' })
    }
}