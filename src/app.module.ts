import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PeriodosLetivosModule } from './periodos-letivos/periodos-letivos.module';
import { DisciplinasModule } from './disciplinas/disciplinas.module';
import { ProcessosModule } from './processos/processos.module';
import { TurmasModule } from './turmas/turmas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VinculosModule } from './vinculos/vinculos.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', 
    }),

    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL') || config.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

 
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('PGHOST'),
        port: parseInt(config.get<string>('PGPORT') || '5432'), 
        username: config.get<string>('PGUSER'),
        password: config.get<string>('PGPASSWORD'),
        database: config.get<string>('PGDATABASE'),
        autoLoadEntities: true,
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),

    PeriodosLetivosModule,
    DisciplinasModule,
    ProcessosModule,
    TurmasModule,
    UsuariosModule,
    VinculosModule,
  ],
 
  controllers: [],
  providers: [],
})
export class AppModule {}
