// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, unique: true })
    email!: string;

    @Prop({ required: true, select: false }) // 👈 field ini TIDAK ikut kebalik saat query biasa
    passwordHash!: string;

    @Prop({ required:false, default: "CASHIER", enum: ["ADMIN", "CASHIER"] })
    role?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);