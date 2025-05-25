import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Turma, TurmaSchema } from './turma.schema';
import { TurmasService } from './turma.service';
import { TurmasController } from './turma.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Turma.name, schema: TurmaSchema }]),
  ],
  providers: [TurmasService],
  controllers: [TurmasController], 
  exports: [TurmasService],
})
export class TurmasModule {}
