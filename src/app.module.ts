import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodosLetivosModule } from './periodos-letivos/periodos-letivos.module';
import { DisciplinasModule } from './disciplinas/disciplinas.module';
import { ProcessosModule } from './processos/processos.module';
import { TurmaModule } from './turmas/turmas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VinculosModule } from './vinculos/vinculos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bonsae_db'),
    PeriodosLetivosModule,
    DisciplinasModule,
    ProcessosModule,
    TurmaModule,
    UsuariosModule,
    VinculosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
