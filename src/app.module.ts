import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://fikrinurhakim099_db_user:rXXv4Fe066HwCg3w@cluster0.tuh3dzr.mongodb.net/?appName=Cluster0"), // 👈 koneksi utama, cukup 1x di root
    ProductsModule
  ]
})

@Module({
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
