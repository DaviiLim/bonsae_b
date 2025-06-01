import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodosLetivosModule } from './periodos-letivos/periodos-letivos.module';
import { DisciplinasModule } from './disciplinas/disciplinas.module';
import { ProcessosModule } from './processos/processos.module';
import { TurmasModule } from './turmas/turmas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinculosModule } from './vinculos/vinculos.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/bonsae_db'),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2010',
      database: 'bonsae',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    // PeriodosLetivosModule,
    // DisciplinasModule,
    ProcessosModule,
    // TurmasModule,
    // UsuariosModule,
    // VinculosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
