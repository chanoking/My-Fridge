import { Test, TestingModule } from '@nestjs/testing';
import { FridgeController } from './fridge.controller';

describe('FridgeController', () => {
  let controller: FridgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FridgeController],
    }).compile();

    controller = module.get<FridgeController>(FridgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
