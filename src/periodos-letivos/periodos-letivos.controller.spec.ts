import { Test, TestingModule } from '@nestjs/testing';
import { PeriodosLetivosController } from './periodos-letivos.controller';
import { PeriodosLetivosService } from './periodos-letivos.service';

describe('PeriodosLetivosController', () => {
  let controller: PeriodosLetivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodosLetivosController],
      providers: [PeriodosLetivosService],
    }).compile();

    controller = module.get<PeriodosLetivosController>(PeriodosLetivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
