import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    example: 'tuanhieptran@gmail.com',
    description: 'User email',
  })
  useremail: string;

  @ApiProperty({
    example: '123',
    description: 'User password',
  })
  password: string;

  @ApiProperty({
    example: 'Tran Tuan Hiep',
    description: 'User name',
  })
  fullname: string;

  @ApiProperty({
    example: '0955647284',
    description: 'User phone',
  })
  phone: string;
}
