import { Test, TestingModule } from '@nestjs/testing';
import { ItinerarioService } from './itinerario.service';

describe('ItinerarioService', () => {
  let service: ItinerarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItinerarioService],
    }).compile();

    service = module.get<ItinerarioService>(ItinerarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
