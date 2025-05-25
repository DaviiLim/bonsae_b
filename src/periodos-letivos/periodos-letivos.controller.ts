import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PeriodosLetivosService } from './periodos-letivos.service';
import { CreatePeriodosLetivoDto } from './dto/create-periodos-letivo.dto';
import { UpdatePeriodosLetivoDto } from './dto/update-periodos-letivo.dto';

@Controller('periodos-letivos')
export class PeriodosLetivosController {
  constructor(private readonly periodosLetivosService: PeriodosLetivosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPeriodosLetivoDto: CreatePeriodosLetivoDto) {
    return await this.periodosLetivosService.create(createPeriodosLetivoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.periodosLetivosService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.periodosLetivosService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updatePeriodosLetivoDto: UpdatePeriodosLetivoDto) {
    return await this.periodosLetivosService.update(id, updatePeriodosLetivoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.periodosLetivosService.delete(id);
  }

  @Get('processos/:id')
  @HttpCode(HttpStatus.OK)
  async buscarProcesso(@Param('id') id: string) {
    return await this.periodosLetivosService.buscarProcesso(id);
  }
}
