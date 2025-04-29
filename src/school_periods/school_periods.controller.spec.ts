import { Test, TestingModule } from '@nestjs/testing';
import { SchoolPeriodsController } from './school_periods.controller';
import { SchoolPeriodsService } from './school_periods.service';

describe('SchoolPeriodsController', () => {
  let controller: SchoolPeriodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolPeriodsController],
      providers: [SchoolPeriodsService],
    }).compile();

    controller = module.get<SchoolPeriodsController>(SchoolPeriodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
