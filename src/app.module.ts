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
import { PaymentController } from './payment/controller/payment/payment.controller';
import { PaymentModule } from './payment/payment.module';
import { PaymentService } from './payment/controller/service/payment/payment.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(dbconfig),
    ProductModule,
    UserModule,
    PaymentModule,
    TypeOrmModule.forFeature([Product, User]),
    ConfigModule.forRoot()
  ],
  controllers: [ProductController, UserController,PaymentController],
  providers: [ProductService, UserService,PaymentService],
})
export class AppModule {}
