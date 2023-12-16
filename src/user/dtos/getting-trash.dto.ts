import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class GettingTrashDto extends PickType(UserEntity, ['trash'] as const) {}
