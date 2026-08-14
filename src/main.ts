import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/intersecptors/transform.intersecptor';
import { GlobalExceptionFilter } from './common/filter/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Konfigurasi dasar info API
  const config = new DocumentBuilder()
    .setTitle("POS System API") // judul besar halaman dokumentasi
    .setDescription("Dokumentasi API POS System")
    .setVersion("1.0")
    .addBearerAuth() // tombol gembok token JWT
    .build()

  // 2. Generate & pasang dokumen ke endpoint /docs
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document); // akses di http://localhost:3000/docs

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
