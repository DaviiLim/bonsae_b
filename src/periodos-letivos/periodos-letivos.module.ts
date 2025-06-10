import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodosLetivosController } from './periodos-letivos.controller';
import { PeriodosLetivos, PeriodosLetivosSchema } from './schema/periodos-letivos.schema';
import { PeriodosLetivosService } from './periodos-letivos.service';
import { Processo, ProcessoSchema } from 'src/processos/schema/processos.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School_Periods } from './entities/periodos-letivo.entity';
import { AcademicClasses } from 'src/disciplinas/entities/disciplina.entity';
import { Disciplines } from 'src/turmas/entities/turma.entity';
import { User } from 'src/usuarios/entities/usuario.entity';
import { DisciplineUser } from 'src/vinculos/entities/vinculo.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PeriodosLetivos.name, schema: PeriodosLetivosSchema },
      { name: Processo.name, schema: ProcessoSchema },
    ]),
            TypeOrmModule.forFeature([
              School_Periods,
              AcademicClasses,
              Disciplines,
              User,
              DisciplineUser
            ]),
  ],
  providers: [PeriodosLetivosService],
  controllers: [PeriodosLetivosController],
})
export class PeriodosLetivosModule {}
