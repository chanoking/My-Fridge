import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFridgeDto } from './dtos/create-fridge.dto';

@Injectable()
export class FridgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findFridge(fridgeId: number) {
    return this.prisma.refrigerators.findFirst({
      where: { fridgeId },
    });
  }

  async createFridge(data: CreateFridgeDto) {
    return this.prisma.refrigerators.create({ data });
  }

  async deleteFridge(fridgeId: number) {
    return this.prisma.refrigerators.delete({
      where: { fridgeId },
    });
  }
}
