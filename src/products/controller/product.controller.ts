import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductDTO } from '../dto/product.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/users/guard/user.guard';

@ApiTags('Product')
@Controller('product')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' }) 
  async findById(@Param('id') id: number) {
    return this.productService.findById(id);
  }


  @Post()
  @ApiOperation({ summary: 'Create a new product' }) 
  async create(@Body() ProductDTO: ProductDTO) {
    return this.productService.create(ProductDTO);
  }

 
  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' }) 
  async update(@Param('id') id: number, @Body() ProductDTO: ProductDTO) {
    return this.productService.update(id, ProductDTO);
  }

 
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' }) 
  async delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
