import { Test, TestingModule } from '@nestjs/testing';
import { TurmaService } from './turmas.service';

describe('TurmasService', () => {
  let service: TurmaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurmaService],
    }).compile();

    service = module.get<TurmaService>(TurmaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
