import { Test, TestingModule } from '@nestjs/testing';
import { FridgeService } from './fridge.service';

describe('FridgeService', () => {
  let service: FridgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FridgeService],
    }).compile();

    service = module.get<FridgeService>(FridgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
