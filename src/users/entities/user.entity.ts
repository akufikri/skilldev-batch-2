// src/users/entities/user.entity.ts
import { Exclude, Transform } from "class-transformer";
import { Types } from "mongoose";

export class UserEntity {
    @Transform(({ value }: { value: Types.ObjectId | string }) => value.toString()) // ObjectId → string
    _id!: Types.ObjectId | string

    name!: string;
    email!: string;
    role!: string;

    @Exclude() // 👈 field ini DIBUANG total dari response, bukan cuma disembunyikan
    passowrdHash!: string

    constructor(partial: Partial<UserEntity>){
        Object.assign(this, partial);
        if (partial._id) this._id = (partial._id as unknown as Types.ObjectId).toString();
    }
}
