import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplinasService } from './disciplinas.service';
import { DisciplinasController } from './disciplinas.controller';
import { Disciplina, DisciplinaSchema } from './schema/disciplinas.schema';
import { PeriodosLetivos, PeriodosLetivosSchema } from '../periodos-letivos/schema/periodos-letivos.schema';
import { Processo, ProcessoSchema } from 'src/processos/schema/processos.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School_Periods } from 'src/periodos-letivos/entities/periodos-letivo.entity';
import { AcademicClasses } from './entities/disciplina.entity';
import { Disciplines } from 'src/turmas/entities/turma.entity';
import { User } from 'src/usuarios/entities/usuario.entity';
import { DisciplineUser } from 'src/vinculos/entities/vinculo.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Disciplina.name, schema: DisciplinaSchema },
      { name: Processo.name, schema: ProcessoSchema },
      { name: PeriodosLetivos.name, schema: PeriodosLetivosSchema },
    ]),
            TypeOrmModule.forFeature([
              School_Periods,
              AcademicClasses,
              Disciplines,
              User,
              DisciplineUser
            ]),
  ],
  controllers: [DisciplinasController],
  providers: [DisciplinasService],
})
export class DisciplinasModule {}