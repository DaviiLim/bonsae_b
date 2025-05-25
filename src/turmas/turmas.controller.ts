import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTurmaDto) {
    return await this.turmasService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.turmasService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return await this.turmasService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: UpdateTurmaDto) {
    return await this.turmasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.turmasService.delete(id);
  }

  @Get('processo/:id')
  @HttpCode(HttpStatus.OK)
  async getProcesso(@Param('id') id: string) {
    return await this.turmasService.buscarProcesso(id);
  }

  @Get('disciplina/:id')
  @HttpCode(HttpStatus.OK)
  async getDisciplina(@Param('id') id: string) {
    return await this.turmasService.buscarDisciplina(id);
  }
}
