// src/files/files.module.ts
import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service"; 

@Module({
    imports: [
        // 👈 tanpa 'dest'/'storage' custom, Multer default pakai MEMORY storage
        // artinya file masuk sebagai Buffer di RAM (file.buffer), BUKAN ditulis ke disk lokal
        // — ini penting! kalau ditulis ke disk dulu, balik lagi ke masalah stateless server
        MulterModule.register({}),
    ],
    controllers: [ FilesController ],
    providers: [FilesService]
})

export class FilesModule {}