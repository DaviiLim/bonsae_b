import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodosLetivosController } from './periodos-letivos.controller';
import { PeriodosLetivos, PeriodosLetivosSchema } from './schema/periodos-letivos.schema';
import { PeriodosLetivosService } from './periodos-letivos.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PeriodosLetivos.name, schema: PeriodosLetivosSchema },
    ]),
  ],
  providers: [PeriodosLetivosService],
  controllers: [PeriodosLetivosController],
})
export class PeriodosLetivosModule {}
