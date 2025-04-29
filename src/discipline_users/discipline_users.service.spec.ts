import { Test, TestingModule } from '@nestjs/testing';
import { DisciplineUsersService } from './discipline_users.service';

describe('DisciplineUsersService', () => {
  let service: DisciplineUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplineUsersService],
    }).compile();

    service = module.get<DisciplineUsersService>(DisciplineUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
