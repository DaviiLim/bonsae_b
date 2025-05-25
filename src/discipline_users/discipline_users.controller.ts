import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisciplineUsersService } from './discipline_users.service';
import { CreateDisciplineUserDto } from './dto/create-discipline_user.dto';
// import { UpdateDisciplineUserDto } from './dto/update-discipline_user.dto';

@Controller('discipline-users')
export class DisciplineUsersController {
  constructor(private readonly disciplineUsersService: DisciplineUsersService) {}

  @Post()
  create(@Body() createDisciplineUserDto: CreateDisciplineUserDto) {
    return this.disciplineUsersService.create(createDisciplineUserDto);
  }

  @Get()
  findAll() {
    return this.disciplineUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplineUsersService.findOne(+id);
  }

  /** 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDisciplineUserDto: UpdateDisciplineUserDto) {
    return this.disciplineUsersService.update(+id, updateDisciplineUserDto);
  }
  */
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplineUsersService.remove(+id);
  }
}
