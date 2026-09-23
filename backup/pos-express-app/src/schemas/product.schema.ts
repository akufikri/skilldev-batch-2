// src/schemas/product.schema.ts
import { z } from "zod"

export const CreateProductSchema = z.object({
    body: z
        .object({
            title: z.string({ error: "Title is strictly required" }).min(3, "Min 3 karakter"),
            price: z.number({ error: "Price is required" }).positive("Harus angka positif")
        })
        .strict(), // tolak properti tambahan yang tidak didefinisikan di skema
})


export type CreateProductSchema = z.infer<typeof CreateProductSchema>; // tipe TS otomatis dari skema