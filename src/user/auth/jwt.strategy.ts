import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_SECRET_KEY,
      ignoreExpiration: true,
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.authService.findOneUser(payload.user.userId);
      if (user) {
        return user;
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
