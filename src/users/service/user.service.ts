import {
  Injectable,
  ConflictException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDTO } from '../dto/register-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(userDto: UserDTO): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { useremail: userDto.useremail },
    });
    if (existingUser) {
      throw new ConflictException('Email này đã được đăng ký.');
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(userDto.password, saltRounds);

    const user = this.userRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDTO): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { useremail: loginUserDto.useremail },
    });
    if (!user) {
      throw new HttpException('Email is not exist', HttpStatus.UNAUTHORIZED);
    }
    const checkPass = bcrypt.compareSync(loginUserDto.password, user.password);
    if (!checkPass) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = { id: user.id, useremail: user.useremail };
    return this.generateToken(payload);
  }


  async refreshToken(refresh_token: string): Promise<any> {
    try {
        const verify = await this.jwtService.verifyAsync(refresh_token, {
            secret: this.configService.get<string>('SECRET')
        })
      console.log(verify);
      const checkExistToken = await  this.userRepository.findOneBy({useremail:verify.useremail, refresh_token});
      if(checkExistToken){
        return this.generateToken({id: verify.id, useremail: verify.useremail})
      } else{
        throw new  HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
      }

    } catch (error) {
        throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
    }
}
  private async generateToken(payload: { id: number; useremail: string }) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET'),
      expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN'),
    });

    await this.userRepository.update(
      { useremail: payload.useremail },
      { refresh_token: refresh_token },
    );
    console.log(refresh_token);
    return { access_token, refresh_token };
  }
}
