// src/auth/interfaces/jwt-payload.interface.ts

export interface JwtPayload {
    sub: string;
    email: string;
    role: "CASHIER" | "MANAGER" | "ADMIN";
}

export interface RequestWithUser{
    user?: JwtPayload
}