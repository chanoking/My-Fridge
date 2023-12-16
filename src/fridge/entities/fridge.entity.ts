import { Refrigerators } from '@prisma/client';
import { IsString } from 'class-validator';

export class FridgeEntity implements Refrigerators {
  fridgeId: number;

  @IsString()
  brandName: string;
  published: boolean;
  enrolledAt: Date;
  ownerId: number;
}
