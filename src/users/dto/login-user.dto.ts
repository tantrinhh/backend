import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty,IsEmail } from "class-validator";

 export class LoginUserDTO{
   @IsNotEmpty()
   @IsEmail()
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
 }