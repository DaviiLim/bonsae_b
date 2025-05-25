import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Disciplina, DisciplinaSchema } from './schemas/disciplina.schema';
import { DisciplinasController } from './controller/disciplinas.controller';
import { DisciplinasService } from './service/disciplinas.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Disciplina.name, schema: DisciplinaSchema }]),
  ],
  providers: [DisciplinasService],
  controllers: [DisciplinasController], 
  exports: [DisciplinasService],
})
export class DisciplinaModule {}
