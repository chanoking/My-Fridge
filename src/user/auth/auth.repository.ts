import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUniqueByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async findUniqueByNickname(nickname: string) {
    return this.prisma.users.findUnique({
      where: { nickname },
    });
  }

  async createUser(data: CreateUserDto) {
    return this.prisma.users.create({ data });
  }

  async findOneUser(userId: number) {
    return await this.prisma.users.findFirst({
      where: { userId },
    });
  }

  async increaseTrash(userId: number): Promise<void> {
    await this.prisma.users.update({
      where: { userId },
      data: {
        trash: {
          increment: 1,
        },
      },
    });
  }
}
