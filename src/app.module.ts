import { Module } from '@nestjs/common';

import dbconfig from '../db';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './products/module/product.module';
import { ProductController } from './products/controller/product.controller';
import { ProductService } from './products/service/product.service';
import { Product } from './products/entity/product.entity';
import { UserController } from './users/controller/user.controller';
import { UserService } from './users/service/user.service';
import { User } from './users/entity/user.entity';
import { UserModule } from './users/module/user.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRoot(dbconfig),
    ProductModule,
    UserModule,
    TypeOrmModule.forFeature([Product, User]),
    ConfigModule.forRoot()
  ],
  controllers: [ProductController, UserController],
  providers: [ProductService, UserService],
})
export class AppModule {}
