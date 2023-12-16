import { PickType } from '@nestjs/swagger';
import { FridgeEntity } from '../entities/fridge.entity';

export class CreateFridgeDto extends PickType(FridgeEntity, [
  'brandName',
  'published',
] as const) {}
