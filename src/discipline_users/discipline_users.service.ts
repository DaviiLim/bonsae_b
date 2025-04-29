import { Injectable } from '@nestjs/common';
import { CreateDisciplineUserDto } from './dto/create-discipline_user.dto';
import { UpdateDisciplineUserDto } from './dto/update-discipline_user.dto';

@Injectable()
export class DisciplineUsersService {
  create(createDisciplineUserDto: CreateDisciplineUserDto) {
    return 'This action adds a new disciplineUser';
  }

  findAll() {
    return `This action returns all disciplineUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} disciplineUser`;
  }

  update(id: number, updateDisciplineUserDto: UpdateDisciplineUserDto) {
    return `This action updates a #${id} disciplineUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} disciplineUser`;
  }
}
