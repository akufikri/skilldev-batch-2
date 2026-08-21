import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@UseGuards(AuthGuard)
@ApiTags("Products Management") // 👈 kelompokkan semua rute produk jadi satu grup di UI// 👈 kelompokkan semua rute produk jadi satu grup di UI
@Controller('products')

@UseInterceptors(CacheInterceptor) // define cache interseptor for product api

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get("categories-list")
  @CacheKey("custom_categories_key") // opsional; default pakai URL sebagai kunci
  @CacheTTL(300 * 1000) // override TTL global, khusus endpoint ini 5 menit
  async getCategories()
  {
    return this.productsService.findAllWithCategory();
  }
  
  @Post()
  @ApiOperation({ summary: "Create Product",  description: "Add New Product into POS System"})
  @ApiResponse({ status: 201, description: "Operation Successful" })
  @ApiResponse({ status: 400, description: "Validation failed" })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: "Get Product",  description: "Get Product into POS System"})
  @ApiResponse({ status: 200, description: "Operation Successful" })
  @ApiResponse({ status: 404, description: "Data not found" })
  findAll(@Query() pagination: PaginationDto) {
    return this.productsService.findAll(
      pagination.skip,
      pagination.limit
    );
  }

  @Get(':id')
  @ApiOperation({ summary: "Get Single Product"})
  @ApiParam({ name: "id", description: "Unique product ID", example: "1" }) // jelaskan parameter URL
  @ApiResponse({ status: 200, description: "Operation Successful" })
  @ApiResponse({ status: 404, description: "Data not found" })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update Product"})
  @ApiParam({ name: "id", description: "Unique product ID", example: "1" }) // jelaskan parameter URL
  @ApiResponse({ status: 200, description: "Operation Successful" })
  @ApiResponse({ status: 400, description: "Validation Error" })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
