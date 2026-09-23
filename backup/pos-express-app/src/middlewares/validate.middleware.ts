// src/middlewares/validate.middleware.ts

import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";

export const validate = (schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
            next(); // lolos validasi → lanjut ke Controller
        } catch (error) {
            next(error); // gagal → potong jalur, lempar ke Global Error Handler
        }
    }
}