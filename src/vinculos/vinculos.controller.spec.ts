import { Test, TestingModule } from '@nestjs/testing';
import { VinculosController } from './vinculos.controller';
import { VinculosService } from './vinculos.service';

describe('VinculosController', () => {
  let controller: VinculosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VinculosController],
      providers: [VinculosService],
    }).compile();

    controller = module.get<VinculosController>(VinculosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
