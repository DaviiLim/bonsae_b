import { Controller, Get, Post, Param, Body, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProcessosService } from './processos.service';

@Controller('processos')
export class ProcessosController {
  constructor(private readonly processosService: ProcessosService) {}

  @Post()
  async criarProcesso(@Body('processoID') processoID: string) {
    if (!processoID) {
      throw new BadRequestException('O campo processoID é obrigatório.');
    }

    try {
      return await this.processosService.criarProcesso(processoID);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async listarTodos() {
    return await this.processosService.listarProcessos();
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    return this.processosService.buscarPorId(id);
  }

  @Post(':id/concluir')
  async concluirProcesso(@Param('id') id: string) {
    return this.processosService.concluirProcesso(id);
  }

  @Get(':id/periodos-letivos')
  async getPeriodosPorProcesso(@Param('id') id: string) {
    return this.processosService.buscarPeriodosPorProcesso(id);
  }
}
