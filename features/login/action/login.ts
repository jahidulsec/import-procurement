"use server"

import { db } from "@/config/db"
import { response } from "@/lib/response"
import { createSession } from "@/lib/session"
import { isValidPassword } from "@/utils/password"
import { LoginType } from "./schema"

export const userLogin = async (data: LoginType) => {
    try {
        // check user
        const user = await db.user.findUnique({
            where: {
                sap_id: data.sap_id
            },

        })

        if (!user) throw new Error("User does not exist")

        // check password
        if (!await isValidPassword(data.password, user.password)) throw new Error("Invalid password")


        // create session
        await createSession({
            sapId: user.sap_id, role: user.role
        })

        return response({ success: true, message: "You are logged in successfully", data: user })

    } catch (error) {
        console.error(error)
        return response({ success: false, message: (error as Error).message ?? 'Something went wrong' })
    }
}