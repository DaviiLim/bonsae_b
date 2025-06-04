import { Controller, Post, Get, Param, Delete, Body, HttpCode, HttpStatus} from '@nestjs/common';
import { ProcessosService } from './processos.service';
import { Processo } from './schema/processos.schema';
import { CreateProcessoDto } from './dto/create-processo.dto';
import { Processo as ProcessoSQL } from './entities/processo.entity';

@Controller('processos')
export class ProcessosController {
  constructor(private readonly processosService: ProcessosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProcessoDto): Promise<Processo> {
    return this.processosService.create(dto);
  }

  @Get()
  async find(): Promise<Processo[]> {
    return this.processosService.find();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Processo> {
    return this.processosService.findById(id);
  }

  @Post(':id/concluir')
  async concluir(@Param('id') id: string): Promise<Processo> {
    return this.processosService.concluirProcesso(id);
  }

  @Post(':id/abortar')
  async cacnelar(@Param('id') id: string): Promise<Processo> {
    return this.processosService.abortarProcessoNome(id);
  }  

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.processosService.delete(id);
  }

  @Post(':id/full')
  @HttpCode(HttpStatus.OK)
  async buscarTudoPorProcesso(@Param('id') id: string) {
    return this.processosService.buscarTudoById(id);
  }
  

  @Post(':id/migrar') // não usar 
  @HttpCode(HttpStatus.OK)
  async rollback(@Param('id') id: string): Promise<{ message: string }> {
    await this.processosService.migrarProcesso(id);
    return { message: 'Migração realizada com sucesso! parabéns!!' };
  }

    @Get('completo')              
  @HttpCode(HttpStatus.OK)
  async getAllWithPeriodos(): Promise<ProcessoSQL[]> {
    return this.processosService.findAllWithPeriodos();
  }
}
