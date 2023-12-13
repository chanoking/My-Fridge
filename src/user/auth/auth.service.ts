import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
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
      const isExistEmail = await this.prisma.users.findUnique({
        where: { email },
      });
      const isExistNickname = await this.prisma.users.findUnique({
        where: { nickname },
      });
      if (isExistEmail) {
        throw new ConflictException('Already existed email');
      }
      if (isExistNickname) {
        throw new ConflictException('Already existed nickname');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.prisma.create({
        data: {},
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException({
        errorMessage: 'Failed',
      });
    }
  }
}
