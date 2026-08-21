import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager'; // tipe murni dari cache-manager, bukan @nestjs

@Injectable() 
export class ProductsService {
  // 🔥 @InjectModel: setara "@Injectable()" tapi khusus untuk model Mongoose
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache, // 👈 suntik kontrol cache manual
  ) {}

  async findAllCustom(): Promise<Product[]> {
    const cacheKey = "all_products_active"

    const cacheData = await this.cacheManager.get<Product[]>(cacheKey) // 1. cek cache dulu
    if(cacheData) return cacheData;  // hit → langsung balikkan, skip MongoDB

    const products = await this.productModel.find().exec();  // 2. cache miss → ambil dari DB
    await this.cacheManager.set(cacheKey, products, 30 * 1000) // 3. simpan untuk request berikutnya

    return products;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    // const created = new this.productModel(dto); // buat instance dokumen baru
    // return created.save(); // .save() → simpan ke MongoDB, kembalikan dokumen tersimpan

    const newProduct = new this.productModel(dto);
    const saved = await newProduct.save();

    // 4. 🔥 CACHE INVALIDATION: WAJIB hapus cache lama saat ada mutasi data (create/update/delete)
    await this.cacheManager.del("all_products_active");
    
    return saved;
  }

  findAll(skip: number, limit: number): Promise<Product[]> {
    return this.productModel
      .find()
      .skip(skip)
      .limit(limit); // ambil semua dokumen
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException("Product Not Found"); // jaring pengaman
    return product;
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const updated = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true, // 👈 kembalikan dokumen versi TERBARU (default: versi lama sebelum update)
      runValidators: true // 👈 jalankan ulang aturan @Prop() (mis. min: 0) saat update, bukan cuma saat create
    });

    if (!updated) throw new NotFoundException("Product not found")

    return updated
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.productModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException("Product not found");
  }

  async findAllWithCategory(){
    // 'category' = nama field, 'name' = hanya ambil field 'name' dari Category (hemat bandwidth)
    return this.productModel.find().populate("category", "name");
  }

  async search(keyword: string): Promise<Product[]>{
    const filter = {
      title: {$regex: keyword, $options: "i"}
    };

    return this.productModel.find(filter)
  }
}
