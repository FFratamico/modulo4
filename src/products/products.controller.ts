import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { IdParamDTO } from 'src/OthersDtos/id-param.dto';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/config/enum/role.enum';
import { RolesGuard } from 'src/auth/guard/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return await this.productsService.getAll();
  }

  @Get('page')
    async getUsersWithPagination(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 5,
    ) {
      return await this.productsService.getProductsWithPagination(page, limit);
    }

  @Get(':id')
  async getProductById(@Param() param: IdParamDTO) {
    return await this.productsService.getProductById(param.id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard) // Header de autorizacion
  async create(@Body() newProduct: CreateProductDto) {
    return await this.productsService.createProduct(newProduct);
  }

  @Post('seeder')
  async addProductsSeeder(){
    return await this.productsService.addProductsSeeder();
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard) // Header de autorizacion
  async remove(@Param() param: IdParamDTO) {
    return await this.productsService.removeProduct(param.id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard) // Header de autorizacion
  async update(@Param() param: IdParamDTO, @Body() updateProduct: UpdateProductDto) {
    return await this.productsService.update(param.id, updateProduct)
  }
}
