import { Module } from '@nestjs/common';
import { VinculosService } from './vinculos.service';
import { VinculosController } from './vinculos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Turma, TurmaSchema } from 'src/turmas/schema/turmas.schema';
import { Processo, ProcessoSchema } from 'src/processos/schema/processos.schema';
import { Usuario, UsuarioSchema } from 'src/usuarios/schema/usuarios.schema';
import { VinculoAluno, VinculoAlunoSchema } from './schema/vinculo-aluno-turma.schema';
import { VinculoProfessor, VinculoProfessorSchema } from './schema/vinculo-professor-turma.schema';
import { Disciplina, DisciplinaSchema } from 'src/disciplinas/schema/disciplinas.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School_Periods } from 'src/periodos-letivos/entities/periodos-letivo.entity';
import { AcademicClasses } from 'src/disciplinas/entities/disciplina.entity';
import { Disciplines } from 'src/turmas/entities/turma.entity';
import { User } from 'src/usuarios/entities/usuario.entity';
import { DisciplineUser } from './entities/vinculo.entity';
import { Vinculo, VinculoSchema } from './schema/vinculo.schema';


@Module({
    imports: [
        MongooseModule.forFeature([
          { name: Turma.name, schema: TurmaSchema },
          { name: Usuario.name, schema: UsuarioSchema },
          { name: Disciplina.name, schema: DisciplinaSchema },
          { name: Processo.name, schema: ProcessoSchema },
          {name: VinculoAluno.name, schema: VinculoAlunoSchema},
          {name: VinculoProfessor.name, schema: VinculoProfessorSchema},
          { name: Vinculo.name, schema: VinculoSchema },
        ]),
                    TypeOrmModule.forFeature([
                      School_Periods,
                      AcademicClasses,
                      Disciplines,
                      User,
                      DisciplineUser,
                      Vinculo
                    ]),
      ],
  controllers: [VinculosController],
  providers: [VinculosService],
})
export class VinculosModule {}
