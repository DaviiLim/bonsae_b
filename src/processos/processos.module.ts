// src/processos/processos.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessosController } from './processos.controller';
import { ProcessosService } from './processos.service';
import { Processo, ProcessoSchema } from './schema/processos.schema';
import { PeriodosLetivos, PeriodosLetivosSchema } from 'src/periodos-letivos/schema/periodos-letivos.schema';
import { Disciplina, DisciplinaSchema } from 'src/disciplinas/schema/disciplinas.schema';
import { VinculoAluno, VinculoAlunoSchema } from 'src/vinculos/schema/vinculo-aluno-turma.schema';
import { VinculoProfessor, VinculoProfessorSchema } from 'src/vinculos/schema/vinculo-professor-turma.schema';
import { Usuario, UsuarioSchema } from 'src/usuarios/schema/usuarios.schema';
import { Turma, TurmaSchema } from 'src/turmas/schema/turmas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Processo.name, schema: ProcessoSchema },
      { name: Disciplina.name, schema: DisciplinaSchema },
      { name: Processo.name, schema: ProcessoSchema },
      { name: PeriodosLetivos.name, schema: PeriodosLetivosSchema },
      { name: Turma.name, schema: TurmaSchema },
      { name: Usuario.name, schema: UsuarioSchema },
      {name: VinculoAluno.name, schema: VinculoAlunoSchema},
      {name: VinculoProfessor.name, schema: VinculoProfessorSchema}
      
    ])],
  controllers: [ProcessosController],
  providers: [ProcessosService],
})
export class ProcessosModule {}