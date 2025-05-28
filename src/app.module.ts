import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PeriodosLetivosModule } from './periodos-letivos/periodos-letivos.module';
import { DisciplinasModule } from './disciplinas/disciplinas.module';
import { ProcessosModule } from './processos/processos.module';
import { TurmasModule } from './turmas/turmas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VinculosModule } from './vinculos/vinculos.module';

@Module({
  imports: [

    // MongoDB
    MongooseModule.forRoot('mongodb://localhost:27017/bonsae_db'),

    PeriodosLetivosModule,
    DisciplinasModule,
    ProcessosModule,
    TurmasModule,
    UsuariosModule,
    VinculosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
