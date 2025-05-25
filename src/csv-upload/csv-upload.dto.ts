// src/csv/dto/csv-upload.dto.ts
import { Type } from 'class-transformer';
import {
  IsString,
  IsIn,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { DisciplinaUploadDto } from 'src/disciplinas/dto/upload-disciplina.dto';
import { UserUploadDto } from 'src/users/dto/upload-user.dto';
import { TurmaUploadDto } from 'src/turmas/dto/upload-turma.dto';
import { VinculoAlunoTurmaUploadDto } from 'src/vinculos-aluno-turma/dto/upload-vinculo_aluno_turma.dto';
import { VinculoProfessorTurmaUploadDto } from 'src/vinculos-professor-turma/dto/upload-vinculo_professor_turma.dto';
import { User } from 'src/users/schema/users.schema';
import { BadRequestException } from '@nestjs/common';
export class CsvUploadDto {
  @IsString()
  @IsIn(['usuario', 'disciplina', 'turma', 'periodo', 'vinculo_aluno_turma', 'vinculo_professor_turma'])
  type: 'usuario' | 'disciplina' | 'turma' | 'periodo' | 'vinculo_aluno_turma' | 'vinculo_professor_turma';

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type((options) => {
    // Condicionalmente, escolher o DTO correto com base no tipo
    switch (options?.object?.type) {
      case 'usuario':
        return UserUploadDto;

      case 'disciplina':
        return DisciplinaUploadDto;

      case 'turma':
        return TurmaUploadDto;

      case 'vinculo_aluno_turma':
        return VinculoAlunoTurmaUploadDto;

      case 'vinculo_professor_turma':
        return VinculoProfessorTurmaUploadDto;

      default:
        throw new BadRequestException(`Tipo invalido: ${options?.object?.type}`)
    }
  })
  data: (DisciplinaUploadDto | UserUploadDto | TurmaUploadDto | VinculoAlunoTurmaUploadDto | VinculoProfessorTurmaUploadDto)[]; 
}
