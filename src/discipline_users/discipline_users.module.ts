import { Module } from '@nestjs/common';
import { DisciplineUsersService } from './discipline_users.service';
import { DisciplineUsersController } from './discipline_users.controller';

@Module({
  controllers: [DisciplineUsersController],
  providers: [DisciplineUsersService],
})
export class DisciplineUsersModule {}
