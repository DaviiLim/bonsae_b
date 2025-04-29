import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeriodoLetivoModule } from './periodo-letivo/periodo-letivo.module';
import { DisciplinasModule } from './disciplinas/disciplinas.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PeriodoLetivoModule,
    DisciplinasModule,
    MongooseModule.forRoot('mongodb://bonsae:bonsae@mongo:27017/bonsae')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
