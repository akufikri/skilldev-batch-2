// src/common/dto/pagination.dto.ts

import { IsOptional, IsPositive } from "class-validator"; // Type dari class-transformer
import { Type } from "class-transformer"

export class PaginationDto { 
    @IsOptional()
    @Type(() => Number) // konversi query string "?page=2" jadi number
    @IsPositive()
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    limit: number = 10

    get skip(): number {
        return (this.page - 1) * this.limit // dipakai langsung sebagai offset query database
    }
}