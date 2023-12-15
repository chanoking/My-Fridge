import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SigninDto } from '../dtos/signin.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(body: CreateUserDto) {
    try {
      const { email, name, nickname, password } = body;
      if (!email || !password || !name || !nickname) {
        throw new BadRequestException({
          errorMessage: 'Wrong',
        });
      }
      const isExistEmail = await this.authRepository.findUnique(body);
      const isExistNickname = await this.authRepository.findUnique(body));
      if (isExistEmail) {
        throw new ConflictException('Already existed email');
      }
      if (isExistNickname) {
        throw new ConflictException('Already existed nickname');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.authRepository.create(body);
      return { message: 'Success!' };
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException({
        errorMessage: 'Failed',
      });
    }
  }

  async signIn(body: SigninDto) {
    if (!body.email || !body.password) {
      throw new BadRequestException({
        errorMessage: 'Data is required',
      });
    }

    const { email, password } = body;

    const user = await this.authRepository.findUnique(body.email, body.password)

    if (!user) {
      throw new ForbiddenException({
        errorMessage: 'Email and password should be checked!',
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new ForbiddenException({
        errorMessage: 'Email and password should be checked!',
      });
    }
    delete user.password;
    try {
      const payload = { user };
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '24h',
        secret: process.env.ACCESS_SECRET_KEY,
      });

      return { accessToken, user, message: 'Signin Success!' };
    } catch (err) {
      throw new InternalServerErrorException({
        errorMessage: 'Failed',
      });
    }
  }

  async findOneUser(userId: number) {
    const user = await this.prisma.users.findFirst({ where: { userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
