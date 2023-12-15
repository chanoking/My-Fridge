import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(body: CreateUserDto) {
    try {
      const { email, nickname } = body;
      const user1 = await this.prisma.users.findUnique({
        where: { email },
      });
      const user2 = await this.prisma.users.findUnique({
        where: { nickname },
      });
      return { user1, user2 };
    } catch (err) {
      console.error(err);
    }
  }

  async create(body: CreateUserDto) {
    try {
      const { email, nickname, name, password } = body;
      const user = await this.prisma.users.create({
        data: {
          email,
          nickname,
          name,
          password,
        },
      });
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  async findOneUser(body: UserEntity) {
    try {
      const { userId } = body;
      const user = await this.prisma.users.findFirst({
        where: { userId },
      });
      return user;
    } catch (err) {
      console.error(err);
    }
  }
}
