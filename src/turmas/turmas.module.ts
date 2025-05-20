import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TurmaController } from './turmas.controller';
import { TurmaService } from './turmas.service';
import { Turma, TurmaSchema } from './schema/turmas.schema';
import { Disciplina, DisciplinaSchema } from 'src/disciplinas/schema/disciplinas.schema';
import { Processo, ProcessoSchema } from 'src/processos/schema/processos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Turma.name, schema: TurmaSchema },
      { name: Disciplina.name, schema: DisciplinaSchema },
      { name: Processo.name, schema: ProcessoSchema },
    ]),
  ],
  controllers: [TurmaController],
  providers: [TurmaService],
})
export class TurmaModule {}
