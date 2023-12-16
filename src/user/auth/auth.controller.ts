import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GettingTrashDto } from '../dtos/getting-trash.dto';
import { SigninDto } from '../dtos/signin.dto';
import { JwtAuthGuard } from '../guards/jwt-guard';
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

  @Post('/signout')
  async signout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async myPage(@User() user: { userId: number }) {
    const currentUser = await this.authService.findOneUser(user.userId);
    return currentUser;
  }

  @Post('trash')
  @UseGuards(JwtAuthGuard)
  async trashAccumulation(
    @Body() body: GettingTrashDto,
    @User() user: { userId: number },
  ) {
    const trash = await this.authService.increaseTrash(user, body);

    return trash;
  }
}
