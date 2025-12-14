"use server"

import { db } from "@/config/db"
import { Prisma, user } from "@/lib/generated/prisma"
import { apiResponse } from "@/lib/response"
import { getCleanData } from "@/utils/formatter"
import { UserQuarySchema, UserQuarySchemaType } from "../action/schema"

const getUsers = async (data: UserQuarySchemaType) => {
    try {
        const cleanData = getCleanData(data)

        // validated searchparams
        const params = UserQuarySchema.parse(cleanData)



        // extract params
        const filter: Prisma.userWhereInput = {
            ...(params.search && {
                OR: [
                    {
                        sap_id: {
                            contains: params.search
                        }
                    },
                ]
            }),
            ...(params.role && {
                role: params.role
            }),
        }

        const [user, count] = await Promise.all([
            db.user.findMany({
                where: filter,
                skip: (params.page - 1) * params.size,
                take: params.size,
                orderBy: {
                    created_at: 'desc'
                }
            }),
            db.user.count({
                where: filter,
            })
        ])


        return apiResponse.multi<user>({
            message: "Get users successful", data: user, count,
        })
    } catch (error) {
        console.error(error)
        return apiResponse.error({ error: error })
    }
}

const getUser = async (id: string) => {
    try {
        const [user] = await Promise.all([
            db.user.findUnique({
                where: { sap_id: id },
            }),

        ])

        // if user does not exist, throw error
        if (!user) throw new Error("Data not found")

        return apiResponse.single<user>({
            message: "Get user successful", data: user
        })
    } catch (error) {
        console.error(error)
        return apiResponse.error({ error: error })
    }
}

export { getUsers, getUser }