import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeriodoLetivoModule } from './periodo-letivo/periodo-letivo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PeriodoLetivoModule,
    MongooseModule.forRoot('mongodb://localhost:27017/bonsae_db')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
