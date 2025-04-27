import { Test, TestingModule } from '@nestjs/testing';
import { AcademicClassesService } from './academic_classes.service';

describe('AcademicClassesService', () => {
  let service: AcademicClassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicClassesService],
    }).compile();

    service = module.get<AcademicClassesService>(AcademicClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
