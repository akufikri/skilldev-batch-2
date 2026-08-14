import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  // 👈 daftarkan model SPESIFIK untuk module ini, agar bisa di-DI ke Service
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
