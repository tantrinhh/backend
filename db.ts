import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { Product } from 'src/products/entity/product.entity';
import { User } from 'src/users/entity/user.entity';
const dbconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  url: 'postgres://hsirgafy:uFO8AUJvt1kaeAdyhmf6ZDzv4N4YL55M@suleiman.db.elephantsql.com/hsirgafy',
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Product,User],

  synchronize: true,
};

export default dbconfig;
