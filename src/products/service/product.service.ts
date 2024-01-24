import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entity/product.entity';
import { ProductDTO } from './../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async create(productDto: ProductDTO): Promise<Product> {
    const product = this.productRepository.create(productDto);
    const savedProduct = await this.productRepository.save(product);

    return savedProduct;
  }

  async update(id: number, productDto: ProductDTO): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({ where: { id } });

    if (!existingProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.update(id, productDto);
    const updatedProduct = await this.productRepository.findOne({ where: { id } });

    return updatedProduct;
  }

  async delete(id: number): Promise<void> {
    const existingProduct = await this.productRepository.findOne({ where: { id } });

    if (!existingProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.delete(id);
  }
}
