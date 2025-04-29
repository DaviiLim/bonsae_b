import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplinasService } from './service/disciplinas.service';
import { DisciplinasController } from './controller/disciplinas.controller';
import { Disciplina, DisciplinaSchema } from './schemas/disciplina.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Disciplina.name, schema: DisciplinaSchema }])],
  controllers: [DisciplinasController],
  providers: [DisciplinasService],
})
export class DisciplinasModule {}
