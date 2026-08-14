import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

@Injectable() 
export class ProductsService {
  // 🔥 @InjectModel: setara "@Injectable()" tapi khusus untuk model Mongoose
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  create(dto: CreateProductDto): Promise<Product> {
    const created = new this.productModel(dto); // buat instance dokumen baru
    return created.save(); // .save() → simpan ke MongoDB, kembalikan dokumen tersimpan
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
