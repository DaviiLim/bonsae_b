import { Controller, Post, Delete, Body } from '@nestjs/common';
import { DisciplineUsersService } from 'src/discipline_users/discipline_users.service';
import { CreateDisciplineUserDto } from 'src/discipline_users/dto/create-discipline_user.dto';

@Controller('discipline-users')
export class DisciplineUsersController {
  constructor(private readonly disciplineUsersService: DisciplineUsersService) {}

  @Post('vincular')
  async vincular(@Body() data: CreateDisciplineUserDto) {
    return this.disciplineUsersService.vincularUsuario(data);
  }

  @Delete('desvincular')
  async desvincular(@Body() data: CreateDisciplineUserDto) {
    return this.disciplineUsersService.desvincularUsuario(data);
  }
}
