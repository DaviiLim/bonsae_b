import { Test, TestingModule } from '@nestjs/testing';
import { DisciplineUsersController } from './discipline_users.controller';
import { DisciplineUsersService } from './discipline_users.service';

describe('DisciplineUsersController', () => {
  let controller: DisciplineUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisciplineUsersController],
      providers: [DisciplineUsersService],
    }).compile();

    controller = module.get<DisciplineUsersController>(DisciplineUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
