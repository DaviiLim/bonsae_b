// src/processos/processos.controller.ts
import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ProcessosService } from './processos.service';

@Controller('processos')
export class ProcessosController {
  constructor(private readonly processosService: ProcessosService) {}

  @Post()
  async criarProcesso(@Body('processoID') processoID: string) {
    return this.processosService.criarProcesso(processoID);
  }

  @Get()
  async listarTodosProcessos() {
    return this.processosService.listarProcessos();
  }

  @Get(':id')
  async buscarProcessoPorId(@Param('id') id: string) {
    try {
      return await this.processosService.procurarProcessos(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post(':id/concluir')
  async finalizarProcesso(@Param('id') id: string) {
    return this.processosService.concluirProcesso(id);
  }
}