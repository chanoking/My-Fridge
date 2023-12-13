import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
