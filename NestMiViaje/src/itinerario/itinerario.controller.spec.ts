import { Test, TestingModule } from '@nestjs/testing';
import { ItinerarioController } from './itinerario.controller';

describe('ItinerarioController', () => {
  let controller: ItinerarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItinerarioController],
    }).compile();

    controller = module.get<ItinerarioController>(ItinerarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
