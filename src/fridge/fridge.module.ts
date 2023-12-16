import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FridgeRepository } from './fridge.repository';
import { FridgeService } from './fridge.service';

@Module({
  imports: [PrismaModule],
  providers: [FridgeService, FridgeRepository],
})
export class FridgeModule {}
