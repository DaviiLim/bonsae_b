import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodosLetivosController } from './periodos-letivos.controller';
import { PeriodosLetivos, PeriodosLetivosSchema } from './schema/periodos-letivos.schema';
import { PeriodosLetivosService } from './periodos-letivos.service';
import { Processo, ProcessoSchema } from 'src/processos/schema/processos.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodosLetivos as PeriodosLetivosSQL } from './entities/periodos-letivo.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PeriodosLetivos.name, schema: PeriodosLetivosSchema },
      { name: Processo.name, schema: ProcessoSchema },
    ]),
    TypeOrmModule.forFeature([PeriodosLetivosSQL])
  ],
  providers: [PeriodosLetivosService],
  controllers: [PeriodosLetivosController],
})
export class PeriodosLetivosModule {}
