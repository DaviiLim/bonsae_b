// src/processos/processos.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessosController } from './processos.controller';
import { ProcessosService } from './processos.service';
import { Processo, ProcessoSchema } from './schema/processos.schema';
import { PeriodosLetivos, PeriodosLetivosSchema } from 'src/periodos-letivos/schema/periodos-letivos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Processo.name, schema: ProcessoSchema },
      { name: PeriodosLetivos.name, schema: PeriodosLetivosSchema },]),
  ],
  controllers: [ProcessosController],
  providers: [ProcessosService],
})
export class ProcessosModule {}