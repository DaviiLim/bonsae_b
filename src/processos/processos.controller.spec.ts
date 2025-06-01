import { Test, TestingModule } from '@nestjs/testing';
import { ProcessosController } from './processos.controller';
import { ProcessosService } from './processos.service';

describe('ProcessosController', () => {
  let controller: ProcessosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessosController],
      providers: [ProcessosService],
    }).compile();

    controller = module.get<ProcessosController>(ProcessosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
