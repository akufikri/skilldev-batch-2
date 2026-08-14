// src/common/filters/http-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch() // tangkap SEMUA jenis eror, mirip (err, req, res, next) Express
export class GlobalExceptionFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR // jaring pengaman terakhir, setara "unknown error" Express

        const message = exception instanceof HttpException
            ? exception.getResponse()
            : "Internal server error";

        response.status(status).json({ success: false, statusCode: status, message })
    }
}
