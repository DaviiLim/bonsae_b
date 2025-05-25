import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeriodosLetivosService } from './periodos-letivos.service';
import { CreatePeriodosLetivoDto } from './dto/create-periodos-letivo.dto';
import { UpdatePeriodosLetivoDto } from './dto/update-periodos-letivo.dto';
import { PeriodoLetivo } from './schema/periodos-letivos.schema';

@Controller('periodos-letivos')
export class PeriodosLetivosController {
  constructor(private readonly periodosLetivosService: PeriodosLetivosService) {}

  @Post()
  create(@Body() dto: CreatePeriodosLetivoDto) {
    return this.periodosLetivosService.create(dto);
  }

  @Get()
  findAll(): Promise<PeriodoLetivo[]> {
    return this.periodosLetivosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.periodosLetivosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePeriodosLetivoDto: UpdatePeriodosLetivoDto) {
    return this.periodosLetivosService.update(id, updatePeriodosLetivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.periodosLetivosService.remove(id);
  }
}
