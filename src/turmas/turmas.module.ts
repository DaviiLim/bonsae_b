import { Module } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { TurmasController } from './turmas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Turma, TurmaSchema } from './schema/turmas.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Turma.name, schema: TurmaSchema },
      ]),
    ],
  controllers: [TurmasController],
  providers: [TurmasService],
})
export class TurmasModule {}
