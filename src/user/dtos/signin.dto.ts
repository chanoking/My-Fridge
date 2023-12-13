import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class SigninDto extends PickType(UserEntity, [
  'email',
  'password',
] as const) {}
