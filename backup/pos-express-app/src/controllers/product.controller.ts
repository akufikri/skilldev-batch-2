// src/controllers/product.controller.ts
import type { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service.js";

export class ProductController {
    // 🔥 MANUAL DEPENDENCY INJECTION: ProductService disuntikkan dari luar via
    // constructor, BUKAN dibuat sendiri dengan "new ProductService()" di dalam
    // (kalau dibuat sendiri = melanggar DIP, sulit di-mock saat testing)

    constructor(private productService: ProductService) {}

    // pakai arrow function agar 'this' tidak hilang saat dipanggil Express Router
    getProducts = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const data = this.productService.getAllProduct(); // delegasikan ke Service
            res.status(200).json({success: true, product: data});
        } catch (error) {
            next(error) // lempar ke Global Error Handler kalau ada eror
        }
    }

    addProducts = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const { title, price } = req.body;
            const newProduct = this.productService.createProduct(title, price);

            res.status(201).json({success: true, product: newProduct});
        } catch (error) {
            next(error) // lempar ke Global Error Handler kalau ada eror
        }
    }
}
