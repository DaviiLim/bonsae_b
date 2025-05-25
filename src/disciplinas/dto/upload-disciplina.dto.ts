// disciplina-upload.dto.ts
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class DisciplinaUploadDto {
  @IsString()
  periodoLetivoIdentificacao: string;

  @IsOptional()
  @IsString()
  disciplina?: string;

  @IsString()
  codigoDaDisciplina: string;

  @IsDateString()
  dataInicial: string;

  @IsDateString()
  dataFinal: string;

  @IsString()
  categoria: string;

  @IsOptional()
  @IsString()
  periodoCurricular?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  campus?: string;
}
