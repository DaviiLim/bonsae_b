import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Post()
  async create(@Body() dto: CreateTurmaDto) {
    return this.turmasService.create(dto);
  }

  @Get()
  async findAll() {
    return this.turmasService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.turmasService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTurmaDto) {
    return this.turmasService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.turmasService.delete(id);
  }
}
