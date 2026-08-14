import {
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsOptional,
  Min,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProductDto {
    // 1. 
    @ApiProperty({ description: "Title or name of the product", example: "iPhone 15 Pro Max" })
    @IsString()
    @IsNotEmpty({ message: "Title is required" })
    title!: string;

    // 2. 
    @ApiProperty({ description: "Price of the product", example: 20000 })
    @IsNumber({}, { message: "Price must be number" })
    @IsPositive({ message: "Price must be positive" })
    price!: number;
    
    @IsNumber()
    @Min(0, { message: "Stock can't be negative" })
    stock!: number;

    // 4. 
    @ApiProperty({ description: "Product description (optional)", example: "iPhone 15 Pro Max IBox" })
    @IsString()
    @IsOptional()
    description?: string;
}