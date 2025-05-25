import { Module } from '@nestjs/common';
import { CsvUploadController } from './csv-upload.controller';
import { CsvUploadService } from './csv-upload.service';
import { MongooseModule } from '@nestjs/mongoose';

// Importa módulos de cada domínio para delegação
import { DisciplinaModule } from 'src/disciplinas/disciplinas.module';
import { UserModule } from 'src/users/user.module';
import { TurmasModule } from 'src/turmas/turma.module';
import { VinculoAlunoTurmaModule } from 'src/vinculos-aluno-turma/vinculo_aluno_turma.module'; 
import { VinculoProfessorTurmaModule } from 'src/vinculos-professor-turma/vinculo_professor_turma.module';

@Module({
  imports: [
    UserModule,
    DisciplinaModule,
    TurmasModule,
    VinculoAlunoTurmaModule,
    VinculoProfessorTurmaModule
    //PeriodoModule,
    //VinculoModule,
  ],
  controllers: [CsvUploadController],
  providers: [CsvUploadService],
  exports: [],
})
export class CsvUploadModule {}
