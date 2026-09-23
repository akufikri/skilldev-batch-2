// src/routes/product.routes.ts
import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { ProductService } from "../services/product.service.js";
// 
import { validate } from "../middlewares/validate.middleware.js";
import { CreateProductSchema } from "../schemas/product.schema.js";

const productRouter: Router = Router();

// 🛠️ PERAKITAN (Manual DI Pipeline)
const productService = new ProductService();  // 1. buat Service dulu

const productController = new ProductController(productService) // 2. suntik ke Controller

productRouter.get("/", productController.getProducts); // 3. petakan rute ke method Controller
productRouter.post("/", validate(CreateProductSchema), productController.addProducts);

export { productRouter }