import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  discount: number;

  @Column()
  count: number;

  @Column('json', { nullable: true }) 
  sizes: string[];

  @Column('json', { nullable: true }) 
  colors: string[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dateAdded: string;
   
}
