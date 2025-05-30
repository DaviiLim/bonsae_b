import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, InternalServerErrorException, ConflictException, BadRequestException, ValidationPipe, UsePipes } from '@nestjs/common';
import { DisciplinasService } from './disciplinas.service';
import { CreateDisciplinaDto, CreateDisciplinasArrayDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';

@Controller('disciplinas')
export class DisciplinasController {
  constructor(private readonly disciplinasService: DisciplinasService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateDisciplinasArrayDto) {
    return this.disciplinasService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.disciplinasService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.disciplinasService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateDisciplinaDto: UpdateDisciplinaDto) {
    return await this.disciplinasService.update(id, updateDisciplinaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.disciplinasService.delete(id);
  }

@Get('processos/:id/disciplinas')
@HttpCode(HttpStatus.OK)
async findProcesso(@Param('id') id: string) {
  return this.disciplinasService.findProcesso(id);
}
}
