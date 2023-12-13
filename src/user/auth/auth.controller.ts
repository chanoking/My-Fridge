import { Body, Controller, Post, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SigninDto } from '../dtos/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Res({ passthrough: true }) response: Response,
    @Body() body: CreateUserDto,
  ) {
    return await this.authService.signUp(body);
  }

  @Post('/signin')
  async signin(
    @Request() req: any,
    @Body() body: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signIn(body);
    res.cookie('Authorization', result?.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return result;
  }
}
