import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { Product } from 'src/products/entity/product.entity';
import { User } from 'src/users/entity/user.entity';
const dbconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Product, User],
  ssl: true,
  synchronize: true,
};

export default dbconfig;
