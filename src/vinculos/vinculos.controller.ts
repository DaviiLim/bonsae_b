import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { VinculosService } from './vinculos.service';
import { CreateVinculoDto, CreateVinculosArrayDto } from './dto/create-vinculo.dto';
import { UpdateVinculoDto } from './dto/update-vinculo.dto';

@Controller('vinculos')
export class VinculosController {
  constructor(private readonly vinculosService: VinculosService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async createMany(@Body() dto: CreateVinculosArrayDto) {
    return this.vinculosService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.vinculosService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return await this.vinculosService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: UpdateVinculoDto) {
    return await this.vinculosService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.vinculosService.delete(id);
  }

  @Get(':id/processos/aluno')
  @HttpCode(HttpStatus.OK)
  async buscarProcessoAluno(@Param('id') id: string) {
    return await this.vinculosService.buscarProcessoAluno(id);
  }

  @Get(':id/processo/professor')
  @HttpCode(HttpStatus.OK)
  async buscarProcessoProfessor(@Param('id') id: string) {
    return await this.vinculosService.buscarProcessoProfessor(id);
  }


}