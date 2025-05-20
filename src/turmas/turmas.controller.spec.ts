import { Test, TestingModule } from '@nestjs/testing';
import { TurmaController } from './turmas.controller';
import { TurmaService } from './turmas.service';

describe('TurmasController', () => {
  let controller: TurmaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurmaController],
      providers: [TurmaService],
    }).compile();

    controller = module.get<TurmaController>(TurmaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
