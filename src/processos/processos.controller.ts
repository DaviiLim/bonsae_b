import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProcessosService } from './processos.service';
import { Processo } from './schema/processos.schema';

@Controller('processos')
export class ProcessosController {
  constructor(private readonly processosService: ProcessosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body('processoID') processoID: string): Promise<Processo> {
    return this.processosService.create(processoID);
  }

  @Get()
  async find(): Promise<Processo[]> {
    return this.processosService.find();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Processo> {
    return this.processosService.findById(id);
  }

  @Patch(':id/concluir')
  async concluir(@Param('id') id: string): Promise<Processo> {
    return this.processosService.concluirProcesso(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.processosService.delete(id);
  }
}
