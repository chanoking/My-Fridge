import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './user/auth/auth.controller';
import { AuthModule } from './user/auth/auth.module';
import { AuthRepository } from './user/auth/auth.repository';
import { AuthService } from './user/auth/auth.service';

@Module({
  imports: [AuthModule, PrismaModule, JwtModule],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, AuthService, AuthRepository],
})
export class AppModule {}
