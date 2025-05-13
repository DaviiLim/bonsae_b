import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplinasService } from './disciplinas.service';
import { DisciplinasController } from './disciplinas.controller';
import { Disciplina, DisciplinaSchema } from './schema/disciplinas.schema';
import { PeriodosLetivos, PeriodosLetivosSchema } from '../periodos-letivos/schema/periodos-letivos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Disciplina.name, schema: DisciplinaSchema },
      { name: PeriodosLetivos.name, schema: PeriodosLetivosSchema } // Adicione esta linha
    ]),
  ],
  controllers: [DisciplinasController],
  providers: [DisciplinasService],
})
export class DisciplinasModule {}