import { Module } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { TurmasController } from './turmas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Turma, TurmaSchema } from './schema/turmas.schema';
import { Processo, ProcessoSchema } from 'src/processos/schema/processos.schema';
import { Disciplina, DisciplinaSchema } from 'src/disciplinas/schema/disciplinas.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School_Periods } from 'src/periodos-letivos/entities/periodos-letivo.entity';
import { AcademicClasses } from 'src/disciplinas/entities/disciplina.entity';
import { Disciplines } from './entities/turma.entity';
import { User } from 'src/usuarios/entities/usuario.entity';
import { DisciplineUser } from 'src/vinculos/entities/vinculo.entity';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Turma.name, schema: TurmaSchema },
        { name: Disciplina.name, schema: DisciplinaSchema },
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
  controllers: [TurmasController],
  providers: [TurmasService],
})
export class TurmasModule {}
