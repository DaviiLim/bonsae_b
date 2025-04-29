import { Test, TestingModule } from '@nestjs/testing';
import { SchoolPeriodsService } from './school_periods.service';

describe('SchoolPeriodsService', () => {
  let service: SchoolPeriodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolPeriodsService],
    }).compile();

    service = module.get<SchoolPeriodsService>(SchoolPeriodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
