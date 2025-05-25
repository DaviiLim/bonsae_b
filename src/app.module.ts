// src/app.module.ts
import { Module }                     from '@nestjs/common';
import { ConfigModule, ConfigService }from '@nestjs/config';
import { MongooseModule }             from '@nestjs/mongoose';
import { AppController }              from './app.controller';
import { AppService }                 from './app.service';
import { PeriodosLetivosModule }      from './periodos-letivos/periodos-letivos.module';
import { CsvUploadModule } from './csv-upload/csv-upload.module';
import { DisciplinaModule } from './disciplinas/disciplinas.module';
import { TurmasModule } from './turmas/turma.module';
import { VinculoAlunoTurmaModule } from './vinculos-aluno-turma/vinculo_aluno_turma.module';
import { VinculoProfessorTurmaModule } from './vinculos-professor-turma/vinculo_professor_turma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],         
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        uri: cs.get<string>('MONGO_URI'),
        retryAttempts: 5,
        retryDelay: 2000,
      }),
    }),

    CsvUploadModule,
    PeriodosLetivosModule,
    DisciplinaModule,
    TurmasModule,
    VinculoAlunoTurmaModule,
    VinculoProfessorTurmaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

