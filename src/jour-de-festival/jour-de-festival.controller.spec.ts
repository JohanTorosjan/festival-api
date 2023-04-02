import { Test, TestingModule } from '@nestjs/testing';
import JourDeFestivalController from './jour-de-festival.controller';

describe('JourDeFestivalController', () => {
  let controller: JourDeFestivalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourDeFestivalController],
    }).compile();

    controller = module.get<JourDeFestivalController>(JourDeFestivalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
