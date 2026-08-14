// src/products/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Types } from "mongoose";

// 🔥 HydratedDocument: gabungkan tipe TypeScript "Product" dengan
// method bawaan dokumen Mongoose (.save(), ._id, dst) secara type-safe
export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })  // 👈 otomatis tambah field createdAt & updatedAt
export class Product{
    @Prop({ required: true })
    title!: string;

    @Prop({ required: true, min: 0 })
    price!: number;

    @Prop({type: Number, default:0 })
    stock: number | undefined;
    
    @Prop({ type: Types.ObjectId, ref: "Category" }) // 👈 simpan referensi fisik ke koleksi Category
    category: Types.ObjectId | undefined
}

// generate blueprint koleksi MongoDB secara otomatis dari Class di atas
export const ProductSchema = SchemaFactory.createForClass(Product);