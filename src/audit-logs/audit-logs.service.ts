import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuditLog, AuditLogDocument } from "./schemas/audit-log.schema";

@Injectable()
export class AuditLogService { 
    constructor(
        @InjectModel(AuditLog.name)
        private readonly auditLogModel : Model<AuditLogDocument>
    ) {}

    // Fungsi untuk menyimpan 1 baris log baru ke MongoDB secara asinkronus
    async createLog(logData: Partial<AuditLog>): Promise<AuditLog> {
        const newLog = new this.auditLogModel(logData)
        return newLog.save();
    }
}