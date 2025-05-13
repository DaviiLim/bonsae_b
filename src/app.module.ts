import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodosLetivosModule } from './periodos-letivos/periodos-letivos.module';
import { DisciplinasModule } from './disciplinas/disciplinas.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bonsae_db'),
    PeriodosLetivosModule,
    DisciplinasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
