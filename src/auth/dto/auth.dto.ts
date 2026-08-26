// src/auth/dto/auth.dto.ts

import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty() @IsString()
    name!: string;
    
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @MinLength(8, { message: "Password must be at least 8 characters long." })
    password!: string; // 👈 password MENTAH dari klien, belum di-hash — beda nama dgn passwordHash di schema
}

export class LoginDto {
    @IsEmail({}, { message: "Format email not valid" })
    email!: string;

    @IsNotEmpty()
    @MinLength(8, { message: "Password must be at least 8 characters long." })
    password!: string;
}