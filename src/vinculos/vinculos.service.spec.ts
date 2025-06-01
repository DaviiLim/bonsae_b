import { Test, TestingModule } from '@nestjs/testing';
import { VinculosService } from './vinculos.service';

describe('VinculosService', () => {
  let service: VinculosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VinculosService],
    }).compile();

    service = module.get<VinculosService>(VinculosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
