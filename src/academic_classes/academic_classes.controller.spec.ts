import { Test, TestingModule } from '@nestjs/testing';
import { AcademicClassesController } from './academic_classes.controller';
import { AcademicClassesService } from './academic_classes.service';

describe('AcademicClassesController', () => {
  let controller: AcademicClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicClassesController],
      providers: [AcademicClassesService],
    }).compile();

    controller = module.get<AcademicClassesController>(AcademicClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
