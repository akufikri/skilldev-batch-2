// src/files/files.controller.ts
import { Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors, Res } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express"; 
import type { Response } from "express";
import { FilesService } from "./files.service";

@Controller("files")
export class FilesController{
    constructor(private readonly filesService: FilesService){}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file")) // 👈 tangkap 1 file dari form-data, field name harus "file"
    async upload(@UploadedFile() file: Express.Multer.File){
        return this.filesService.uploadFile(file)
    }

    @Get(":id")
    async download(@Param("id") id: string, @Res() res: Response){
        const { stream, metadata } = await this.filesService.downloadFile(id);

        res.set({
            "Content-Type": metadata.metadata?.contentType ?? "application/octet-stream",
            "Content-Disposition": `inline; filename="${metadata.filename}"`, // biar browser tahu nama aslinya
        });

        stream.pipe(res) // 🔥 STREAMING langsung ke client, file besar TIDAK dimuat penuh ke RAM server
    }

    @Delete(":id")
    async remove(@Param("id") id: string){
        await this.filesService.deleteFile(id)
        return { success: true, message: "File deleted" }
    }
}