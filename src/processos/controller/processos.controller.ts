import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProcessosService } from '../service/processos.service';
import { Processo } from '../entities/processo.entity';

@Controller('processos')
export class ProcessosController {
  constructor(private readonly processosService: ProcessosService) {}

  @Get()
  async findAll(): Promise<Processo[]> {
    return this.processosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Processo> {
    return this.processosService.findOne(id);
  }

  @Post()
  async create(@Body() processoData: Partial<Processo>): Promise<Processo> {
    return this.processosService.create(processoData);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() processoData: Partial<Processo>,
  ): Promise<Processo> {
    return this.processosService.update(id, processoData);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.processosService.remove(id);
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: string): Promise<Processo[]> {
    return this.processosService.findByStatus(status);
  }
}