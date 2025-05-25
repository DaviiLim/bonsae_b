import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VinculoAlunoTurma, VinculoAlunoTurmaSchema } from './vinculo_aluno_turma.schema';
import { VinculoAlunoTurmaService } from './vinculo_aluno_turma.service';
import { VinculoAlunoTurmaController } from './vinculo_aluno_turma.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VinculoAlunoTurma.name, schema: VinculoAlunoTurmaSchema }]),
  ],
  providers: [VinculoAlunoTurmaService],
  controllers: [VinculoAlunoTurmaController], 
  exports: [VinculoAlunoTurmaService],   
})
export class VinculoAlunoTurmaModule {}