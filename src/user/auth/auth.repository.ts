import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';

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
}
