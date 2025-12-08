"use server"

import { db } from "@/config/db"
import { Prisma, product } from "@/lib/generated/prisma"
import { apiResponse } from "@/lib/response"
import { QuerySchema, QuerySchemaType } from "@/schema/query"
import { getCleanData } from "@/utils/formatter"

const getProducts = async (data: QuerySchemaType) => {
    try {

        const cleanData = getCleanData(data)

        // validated searchparams
        const params = QuerySchema.parse(cleanData)

        // extract params
        const filter: Prisma.productWhereInput = {
            ...(params.search && {
                OR: [
                    {
                        party_name: {
                            contains: params.search
                        }
                    },
                    {
                        invoice: {
                            startsWith: params.search
                        }
                    },
                    {
                        lc_no: {
                            startsWith: params.search
                        }
                    }
                ]
            })
        }

        const [product, count] = await Promise.all([
            db.product.findMany({
                where: filter,
                skip: (params.page - 1) * params.size,
                take: params.size,
                orderBy: {
                    created_at: 'desc'
                }
            }),
            db.product.count({
                where: filter,
            })
        ])


        return apiResponse.multi<product>({
            message: "Get products successful", data: product, count,
        })
    } catch (error) {
        console.error(error)
        return apiResponse.error({ error: error })
    }
}

const getProduct = async (id: string) => {
    try {
        const [product] = await Promise.all([
            db.product.findUnique({
                where: { id },
            }),

        ])

        // if product does not exist, throw error
        if (!product) throw new Error("Data not found")

        return apiResponse.single<product>({
            message: "Get product successful", data: product
        })
    } catch (error) {
        console.error(error)
        return apiResponse.error({ error: error })
    }
}

export { getProducts, getProduct }