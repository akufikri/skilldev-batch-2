// src/files/files.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "stream";
import "multer"

@Injectable()
export class FilesService {
    private bucket: GridFSBucket;

    constructor(@InjectConnection() private readonly connection: Connection){
        if (!this.connection.db) {
            throw new Error("Mongodb connection is not initialized");
        }
        // dibuat sekali saat Service diinisialisasi, dipakai ulang di semua method
        this.bucket = new GridFSBucket(this.connection.db, {
            bucketName: "document", // hasil: koleksi "documents.files" & "documents.chunks"
        });
    }

    // --- UPLOAD ---
    async uploadFile(file: Express.Multer.File): Promise<{ id:string; filename: string }>{
        return new Promise((resolve, reject) => {
            const uploadStream = this.bucket.openUploadStream(file.originalname, {
                metadata: {
                    contentType: file.mimetype,  // simpan metadata tipe file (mis. application/pdf)
                }
            });

            // ubah Buffer (hasil memory storage Multer) jadi Readable Stream lalu alirkan ke GridFS
            Readable.from(file.buffer)
                .pipe(uploadStream)
                .on("error", (error) => reject(error))
                .on("finish", () => {
                    // upload selesai → GridFS sudah otomatis memotongnya jadi chunks 255KB di belakang layar
                    resolve({ id: uploadStream.id.toString(), filename: file.originalname });
                })
        })
    }

    // --- DOWNLOAD ---
    async downloadFile(id: string){
        const _id = new ObjectId(id); // konversi string id dari URL jadi ObjectId MongoDB

        const files = await this.bucket.find({ _id }).toArray();  // cek metadata dulu
        if(!files.length) throw new NotFoundException("File not found")

        return {
            stream: this.bucket.openDownloadStream(_id), // stream isi file (chunks digabung otomatis)
            metadata: files[0] // berisi filename, contentType, length, dst
        }
    }

    // --- DELETE ---
    async deleteFile(id: string):Promise <void>{
        try {
            await this.bucket.delete(new ObjectId(id)) // hapus dokumen di .files DAN semua chunks terkait
        } catch {
            throw new NotFoundException("File not found");
        }
    }
}