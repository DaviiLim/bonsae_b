import { Test, TestingModule } from '@nestjs/testing';
import { PeriodosLetivosService } from './periodos-letivos.service';

describe('PeriodosLetivosService', () => {
  let service: PeriodosLetivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodosLetivosService],
    }).compile();

    service = module.get<PeriodosLetivosService>(PeriodosLetivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
