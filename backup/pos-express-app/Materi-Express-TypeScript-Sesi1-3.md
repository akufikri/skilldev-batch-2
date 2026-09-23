# Materi Kilat: Express.js + TypeScript (Sesi 1–3)
*(Versi ringkas untuk sesi kejar materi — kode inti dipertahankan, penjelasan dipadatkan)*

---

## SESI 1: Pengenalan & Setup Express.js dengan TypeScript

### Apa itu Express.js?
Express adalah web framework minimalis untuk Node.js — dipakai untuk membuat REST API, menangani routing, request/response HTTP, dan middleware. Express **sengaja dibuat tidak "berat"**: fitur seperti validasi, ORM, atau auth harus ditambah sendiri lewat library/middleware pihak ketiga.

### Kenapa + TypeScript?
- **Compile-time safety**: kesalahan tipe data ketahuan saat menulis kode, bukan saat aplikasi sudah live.
- **Autocomplete & dokumentasi otomatis**: `req.body`, `req.params` dsb. punya tipe jelas.
- Fondasi menuju NestJS — NestJS itu sendiri dibangun 100% di atas TypeScript + Express (secara default).

### Langkah 1: Inisialisasi Project
```bash
mkdir pos-express-app && cd pos-express-app
pnpm init                          # bikin package.json
pnpm add express                   # framework utama
pnpm add -D typescript tsx @types/node @types/express
# tsx = jalankan .ts langsung tanpa build manual (pengganti ts-node yang lebih cepat)
```

### Langkah 2: Konfigurasi TypeScript
```bash
pnpm tsc --init
```
Edit `tsconfig.json` — bagian penting untuk project Express modern:
```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",        // wajib untuk import pakai .js extension ala ESM
    "moduleResolution": "NodeNext",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,               // aktifkan semua pengecekan tipe ketat
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

### Langkah 3: Server Pertama
```typescript
// src/index.ts
import express from "express";      // import default export dari express
import type { Request, Response } from "express"; // tipe untuk req & res

const app = express();              // buat instance aplikasi Express
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server Express + TypeScript aktif!" });
});

app.listen(PORT, () => {
  console.log(`⚡ Server berjalan di http://localhost:${PORT}`);
});
```

### Langkah 4: Script `package.json`
```jsonc
{
  "type": "module",              // aktifkan ESM di Node.js
  "scripts": {
    "dev": "tsx watch src/index.ts",  // auto-restart saat file berubah
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```
```bash
pnpm dev
```
**Poin ajar:** dengan `tsx watch`, tidak perlu compile manual tiap ubah kode — cocok untuk development cepat, mirip `nodemon` tapi native TypeScript.

---

## SESI 2: Penerapan OOP pada Arsitektur Controller-Service

### Masalah: Fat Router
Kalau seluruh logika (routing + validasi + HTTP handling + akses data) ditumpuk di satu file `index.ts`, file itu akan membengkak jadi ribuan baris dan mustahil di-unit test. Ini disebut **anti-pola Fat Router**.

### Solusi: Layered Architecture (Controller-Service)
Arsitektur ini adalah tiruan persis dari struktur standar **NestJS**:

| Layer | Tugas | TIDAK boleh tahu |
|---|---|---|
| **Routing** (`*.routes.ts`) | Peta rute + gerbang validasi Zod | Logika bisnis |
| **Controller** (`*.controller.ts`) | Baca `req`, kirim `res` (protokol HTTP) | Cara data diolah di database |
| **Service** (`*.service.ts`) | Logika bisnis murni (kalkulasi, manipulasi data) | Objek `req`/`res` milik Express |

### Langkah 1: Service Layer — Pusat Logika Bisnis
```typescript
// src/services/product.service.ts

// standarisasi bentuk data produk
export interface IDummyProduct {
  id: number;
  title: string;
  price: number;
}

export class ProductService {
  // simulasi "database" di dalam memori
  private products: IDummyProduct[] = [
    { id: 1, title: "iPhone 13", price: 899 },
    { id: 2, title: "MacBook Pro", price: 1999 }
  ];

  getAllProducts(): IDummyProduct[] {
    return this.products;
  }

  createProduct(title: string, price: number): IDummyProduct {
    const newProduct: IDummyProduct = {
      id: Math.floor(Math.random() * 1000) + 100, // simulasi auto-increment
      title,
      price
    };
    this.products.push(newProduct);
    return newProduct;
  }
}
```

### Langkah 2: Controller Layer — Jembatan HTTP ↔ Service
```typescript
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
      const data = this.productService.getAllProducts(); // delegasikan ke Service
      res.status(200).json({ success: true, products: data });
    } catch (error) {
      next(error); // lempar ke Global Error Handler kalau ada eror
    }
  };

  addProduct = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { title, price } = req.body;
      const newProduct = this.productService.createProduct(title, price);
      res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
      next(error);
    }
  };
}
```

### Langkah 3: Routing Layer — Rakit Semuanya
```typescript
// src/routes/product.routes.ts
import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { ProductService } from "../services/product.service.js";
import { validate } from "../middlewares/validate.middleware.js";
import { CreateProductSchema } from "../schemas/product.schema.js";

const productRouter: Router = Router();

// 🛠️ PERAKITAN (Manual DI Pipeline)
const productService = new ProductService();               // 1. buat Service dulu
const productController = new ProductController(productService); // 2. suntik ke Controller

productRouter.get("/", productController.getProducts);      // 3. petakan rute ke method Controller
productRouter.post("/", validate(CreateProductSchema), productController.addProduct);

export { productRouter };
```

### Langkah 4: `src/index.ts` Jadi Bersih
```typescript
import express from "express";
import cors from "cors";
import { requestLogger } from "./middlewares/logger.middleware.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import { productRouter } from "./routes/product.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/products", productRouter); // semua rute /products didelegasikan ke productRouter
app.use(globalErrorHandler);         // wajib paling bawah

app.listen(3000, () => console.log("⚡ Server berjalan"));
```
**Poin ajar:** `index.ts` sekarang cuma "merakit", bukan berisi logika. Ini fondasi langsung menuju arsitektur NestJS.

---

## SESI 3: Middleware & Validasi Data

### Apa itu Middleware?
Fungsi penengah antara Request masuk dan Route Handler akhir. Punya akses ke `req`, `res`, dan `next()`.

```
Client → [Logger/CORS] → [Validasi Zod] → valid? → [Route Handler] → Response
                                        └─ gagal? → [Global Error Handler] → Response
```

**Aturan wajib:** posisi argumen bersifat **mutlak**, bukan berdasarkan nama.
Argumen ke-1 = `req`, ke-2 = `res`, ke-3 = `next`.
- `next()` tanpa argumen → lanjut ke middleware berikutnya.
- `next(error)` → Express langsung lompat ke Global Error Handler, skip semua middleware/rute lain.

### Custom Middleware — Logger
```typescript
// src/middlewares/logger.middleware.ts
import type { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  console.log(`[${new Date().toISOString()}] 🚀 ${req.method} ${req.url}`);
  next(); // 🔥 WAJIB dipanggil, atau request akan menggantung selamanya
}
```

### Middleware Pihak Ketiga (wajib di tiap project)
```bash
pnpm add cors
pnpm add -D @types/cors
```
- `express.json()` — bawaan Express, ubah body JSON mentah jadi objek JS.
- `cors` — buka akses lintas domain (tanpa ini, frontend di port lain akan diblokir browser).

### Validasi Runtime dengan Zod
TypeScript hanya mengecek tipe saat **compile-time**. Data dari klien (`req.body`) baru divalidasi saat **runtime** — di sinilah Zod berperan.

```typescript
// src/schemas/product.schema.ts
import { z } from "zod";

export const CreateProductSchema = z.object({
  body: z
    .object({
      title: z.string({ error: "Title is strictly required" }).min(3, "Min 3 karakter"),
      price: z.number({ error: "Price is required" }).positive("Harus angka positif"),
    })
    .strict(), // tolak properti tambahan yang tidak didefinisikan di skema
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>; // tipe TS otomatis dari skema
```

### Middleware Validasi Generik
```typescript
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
  };
};
```

### Global Error Handler (4 argumen = penanda khusus bagi Express)
```typescript
// src/middlewares/error.middleware.ts
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function globalErrorHandler(
  err: unknown, req: Request, res: Response, next: NextFunction
): void {
  if (err instanceof ZodError) { // 1. eror validasi Zod
    res.status(400).json({
      success: false,
      message: "Validation Error Input",
      errors: err.issues.map((e) => ({ field: e.path.join("."), message: e.message })),
    });
    return;
  }
  if (err instanceof Error) { // 2. eror internal server standar
    res.status(500).json({ success: false, message: err.message });
    return;
  }
  res.status(500).json({ success: false, message: "Unexpected error" }); // 3. jaring pengaman terakhir
}
```

### Merangkai di `index.ts`
```typescript
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.post("/products", validate(CreateProductSchema), async (req, res, next) => {
  try {
    const { title, price } = req.body;
    const isDatabaseConnected = false; // simulasi DB mati
    if (!isDatabaseConnected) throw new Error("Database connection dropped!");
    res.status(201).json({ success: true, product: { id: 151, title, price } });
  } catch (err) {
    next(err); // teruskan ke Global Error Handler
  }
});

app.use(globalErrorHandler); // WAJIB paling bawah, setelah semua rute
```

### Skenario Uji
| Kasus | Body Kiriman | Hasil |
|---|---|---|
| Validasi gagal | `{ "title": "ab", "price": -100 }` | `400 Bad Request` — detail eror dari Zod |
| Validasi lolos, DB error | `{ "title": "Samsung Galaxy", "price": 1200 }` | `500 Internal Server Error` — pesan dari `next(err)` |

**Poin ajar:** jangan pernah `try-catch` + `res.status(500)` manual di tiap rute — selalu lempar ke satu Global Error Handler terpusat.

---

## Cheat Sheet Cepat (3 Sesi)

| Sesi | Konsep Kunci | Satu Kalimat Inti |
|---|---|---|
| 1 | `tsx`, `tsconfig.json`, `NodeNext` | Setup cepat, strict typing dari awal |
| 2 | Controller-Service, Manual DI | Router cuma peta, Controller urus HTTP, Service urus logika |
| 3 | Middleware, Zod, `next(err)` | Validasi & eror dipisah dari logika bisnis, terpusat di satu muara |

*Catatan: Kode dipertahankan utuh dari sumber asli, komentar dipadatkan pada baris-baris kunci agar bisa langsung dijelaskan di kelas tanpa membaca ulang seluruh materi panjang.*
