import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuditLog, AuditLogSchema } from "./schemas/audit-log.schema";
import { AuditLogService } from "./audit-logs.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AuditLog.name, schema: AuditLogSchema }])
    ],
    providers: [AuditLogService],
    exports: [AuditLogService]  // Export agar bisa digunakan oleh Interceptor
})

export class AuditLogsModule {}