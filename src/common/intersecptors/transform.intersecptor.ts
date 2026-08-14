// src/common/interceptors/transform.interceptor.ts

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        return next.handle().pipe(
            map((data) => ({
                sucess: true,
                statusCode: context.switchToHttp().getResponse().statusCode,
                data
            }))
        )
    }
}