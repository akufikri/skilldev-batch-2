import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { AuditLogInterceptor } from './common/intersecptors/audit-log.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://fikrinurhakim099_db_user:rXXv4Fe066HwCg3w@cluster0.tuh3dzr.mongodb.net/?appName=Cluster0"), // 👈 koneksi utama, cukup 1x di root
    CacheModule.register({
      isGlobal: true,  // 👈 sekali daftar di root, langsung bisa dipakai di semua module tanpa impor ulang
      ttl: 60 * 1000, // Time-To-Live: data otomatis "basi" setelah 60 detik (dalam ms)
      max: 100 // batas item di RAM; kalau penuh, item paling jarang dipakai didepak (LRU)
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    AuditLogsModule
  ],
  controllers: [AppController],
  providers: [
    // 💡 Mendaftarkan Interceptor Audit Log secara GLOBAL
    // Sekarang seluruh endpoint API di dalam aplikasi otomatis dicatat log-nya!
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor
    }
  ]
})

export class AppModule {}
