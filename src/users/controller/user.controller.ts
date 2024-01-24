import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDTO } from '../dto/register-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger'; 
import { LoginUserDTO } from '../dto/login-user.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() userDto: UserDTO) {
    return this.userService.register(userDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'User login' }) 
  login(@Body() LoginUserDTO: LoginUserDTO): Promise<any> {
    return this.userService.login(LoginUserDTO);
  }

  @Post('refresh_token')
  @ApiOperation({ summary: 'Refresh access token' })
  refreshToken(@Body() { refresh_token }): Promise<any> {
    return this.userService.refreshToken(refresh_token);
  }
}
