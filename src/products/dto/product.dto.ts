import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty({
    example:
      'https://cdn.vjshop.vn/tin-tuc/8-quy-tac-chup-anh-san-pham-an-tuong/8-quy-tac-chup-anh-san-pham-an-tuong-3.png',
    description: 'Image URL',
  })
  image: string;

  @ApiProperty({
    example: 'Product Name',
    description: 'Product name',
  })
  name: string;

  @ApiProperty({
    example: 'Product Description',
    description: 'Product description',
  })
  description: string;

  @ApiProperty({
    example: '2023-11-15',
    description: 'Date added',
  })
  dateAdded: string; 


  @ApiProperty({
    example: 100.0,
    description: 'Product price',
  })
  price: number;

  @ApiProperty({
    example: 10.0,
    description: 'Discount percentage',
  })
  discount: number;

  @ApiProperty({
    example: 1,
    description: 'Product count',
  })
  count: number;

  @ApiProperty({
    example: ['xl', 'l'],
    description: 'Available sizes',
  })
  sizes: string[];

  @ApiProperty({
    example: ['#000', '#6F3E18'],
    description: 'Available colors',
  })
  colors: string[];
}
