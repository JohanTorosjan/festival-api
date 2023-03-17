import { Test, TestingModule } from '@nestjs/testing';
import { JourDeFestivalService } from './jour-de-festival.service';

describe('JourDeFestivalService', () => {
  let service: JourDeFestivalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JourDeFestivalService],
    }).compile();

    service = module.get<JourDeFestivalService>(JourDeFestivalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
