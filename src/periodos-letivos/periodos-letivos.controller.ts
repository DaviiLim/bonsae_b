import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeriodoLetivoService } from './periodos-letivos.service';
import { CreatePeriodosLetivoDto } from './dto/create-periodos-letivo.dto';
import { UpdatePeriodosLetivoDto } from './dto/update-periodos-letivo.dto';

@Controller('periodos-letivos')
export class PeriodosLetivosController {
  constructor(private readonly periodosLetivosService: PeriodoLetivoService) {}

  @Post()
  create(@Body() createPeriodosLetivoDto: CreatePeriodosLetivoDto) {
    return this.periodosLetivosService.create(createPeriodosLetivoDto);
  }

  @Get()
  findAll() {
    return this.periodosLetivosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodosLetivosService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeriodosLetivoDto: UpdatePeriodosLetivoDto) {
    return this.periodosLetivosService.update(id, updatePeriodosLetivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodosLetivosService.delete(id);
  }
}
