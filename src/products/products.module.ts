import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // 👈 daftarkan model SPESIFIK untuk module ini, agar bisa di-DI ke Service
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    JwtModule.register({})
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
