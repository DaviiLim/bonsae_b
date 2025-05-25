import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VinculoProfessorTurma, VinculoProfessorTurmaSchema } from './vinculo_professor_turma.schema';
import { VinculoProfessorTurmaService } from './vinculo_professor_turma.service';
import { VinculoProfessorTurmaController } from './vinculo_professor_turma.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VinculoProfessorTurma.name, schema: VinculoProfessorTurmaSchema }]),
  ],
  providers: [VinculoProfessorTurmaService],
  controllers: [VinculoProfessorTurmaController], 
  exports: [VinculoProfessorTurmaService],   
})
export class VinculoProfessorTurmaModule {}