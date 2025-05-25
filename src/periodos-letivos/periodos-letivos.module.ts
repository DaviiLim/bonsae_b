import { Module } from '@nestjs/common';
import { PeriodosLetivosService } from './periodos-letivos.service';
import { PeriodosLetivosController } from './periodos-letivos.controller';
import { PeriodoLetivo, PeriodoLetivoSchema } from './schema/periodos-letivos.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PeriodoLetivo.name,
        schema: PeriodoLetivoSchema
      }
    ]),
  ],
  controllers: [PeriodosLetivosController],
  providers: [PeriodosLetivosService],
})
export class PeriodosLetivosModule {}
