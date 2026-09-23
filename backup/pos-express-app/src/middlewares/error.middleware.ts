// src/middlewares/error.middleware.ts
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function globalErorrHandler (
    err: unknown, req: Request, res: Response, next: NextFunction
):void {
    if (err instanceof ZodError) {  // 1. eror validasi Zod
        res.status(400).json({
            success: false,
            message: "Validation Error Input",
            errors: err.issues.map((e) => ({ field: e.path.join("."),
                message: e.message
            })),
        });
        return;
    }
    if (err instanceof Error) { // 2. eror internal server standar
        res.status(500).json({
            success: false,
            message: err.message
        })
        return;
    }
    res.status(500).json({ success:false, message:"Unexpected error"}) // 3. jaring pengaman terakhir
}