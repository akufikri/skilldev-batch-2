// src/index.ts
import express from "express" // import default export dari express
import cors from "cors";
import { productRouter } from "./routes/product.routes.js";
import { requestLogger } from "./middlewares/logger.middleware.js";
import { globalErorrHandler } from "./middlewares/error.middleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/products", productRouter) // semua rute /products didelegasikan ke productRouter
app.use(globalErorrHandler);  // wajib paling bawah
app.listen(4444, () => {
    console.log(`Server running di url http://localhost:${4444}`)
})