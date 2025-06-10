// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
// Importe seus outros módulos aqui:
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
      envFilePath: '.env', // Garante que o .env seja carregado
    }),

    // Configuração do MongoDB (permanece a mesma)
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    // Configuração do PostgreSQL (permanece a mesma, lê do .env)
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '5432'),
        username: config.get('DB_USERNAME'), // Lendo 'postgres' do .env
        password: config.get('DB_PASSWORD'), // Lendo 'admin' do .env
        database: config.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true, // CUIDADO em produção: isso pode apagar seus dados!
      }),
      inject: [ConfigService],
    }),

    // Seus módulos de aplicação
    PeriodosLetivosModule,
    DisciplinasModule,
    ProcessosModule,
    TurmasModule,
    UsuariosModule,
    VinculosModule,
  ],
})
export class AppModule {}