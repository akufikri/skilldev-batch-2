// src/middlewares/logger.middleware.ts
import type { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
    console.log(`[${new Date().toISOString()}] 🚀 ${req.method} ${req.url}`);
    next();
    // 🔥 WAJIB dipanggil, atau request akan menggantung selamanya
}