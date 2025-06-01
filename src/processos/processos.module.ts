// src/processos/processos.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { ProcessosController } from './processos.controller';
import { ProcessosController } from './controller/processos.controller';
// import { ProcessosService } from './processos.service';
import { ProcessosService } from './service/processos.service';
// import { Processo, ProcessoSchema } from './schema/processos.schema';
import {ProcessoRepository} from './repository/processo.repository'
import { Processo } from './entities/processo.entity';
import { PeriodosLetivos, PeriodosLetivosSchema } from 'src/periodos-letivos/schema/periodos-letivos.schema';
import { Disciplina, DisciplinaSchema } from 'src/disciplinas/schema/disciplinas.schema';
import { VinculoAluno, VinculoAlunoSchema } from 'src/vinculos/schema/vinculo-aluno-turma.schema';
import { VinculoProfessor, VinculoProfessorSchema } from 'src/vinculos/schema/vinculo-professor-turma.schema';
import { Usuario, UsuarioSchema } from 'src/usuarios/schema/usuarios.schema';
import { Turma, TurmaSchema } from 'src/turmas/schema/turmas.schema';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    // MongooseModule.forFeature([
    //   { name: Processo.name, schema: ProcessoSchema },
    //   { name: Disciplina.name, schema: DisciplinaSchema },
    //   { name: PeriodosLetivos.name, schema: PeriodosLetivosSchema },
    //   { name: Turma.name, schema: TurmaSchema },
    //   { name: Usuario.name, schema: UsuarioSchema },
    //   { name: VinculoAluno.name, schema: VinculoAlunoSchema },
    //   { name: VinculoProfessor.name, schema: VinculoProfessorSchema },
    // ]),
    TypeOrmModule.forFeature([Processo]),
  ],
  controllers: [ProcessosController,],
  providers: [
    ProcessosService,
    ProcessoRepository,
  ],
})
export class ProcessosModule {}
