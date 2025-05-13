import { Module } from '@nestjs/common';
import { PeriodosLetivosService } from './periodos-letivos.service';
import { PeriodosLetivosController } from './periodos-letivos.controller';

@Module({
  controllers: [PeriodosLetivosController],
  providers: [PeriodosLetivosService],
})
export class PeriodosLetivosModule {}
