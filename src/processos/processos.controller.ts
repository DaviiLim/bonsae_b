import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
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
}
