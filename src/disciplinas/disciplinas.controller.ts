import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DisciplinasService } from './disciplinas.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { Disciplina } from './schema/disciplinas.schema';

@Controller('disciplinas')
export class DisciplinasController {
  constructor(private readonly disciplinasService: DisciplinasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDisciplinaDto: CreateDisciplinaDto) {
    return await this.disciplinasService.create(createDisciplinaDto);
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

  @Post('many')
  @HttpCode(HttpStatus.CREATED)
  async createMany(@Body() dtos: CreateDisciplinaDto[]): Promise<Disciplina[]> {
    return await this.disciplinasService.createMany(dtos);
  }

  @Get('processos/:id')
  @HttpCode(HttpStatus.OK)
  async buscarProcesso(@Param('id') id: string) {
    return await this.disciplinasService.buscarProcesso(id);
  }

  @Get('periodos-letivos/:id')
  @HttpCode(HttpStatus.OK)
  async buscarPeriodoLetivo(@Param('id') id: string) {
    return await this.disciplinasService.buscarPeriodoLetivo(id);
  }
}
