import { IsArray, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DisciplinasCategoriaEnum } from '../enum/disciplinasCategoria.enum';
import { DisciplinasEstadoEnum } from '../enum/disciplinasEstado.enum';

export class CreateDisciplinaDto {
  
  @IsNotEmpty()
  @IsMongoId()
  periodosLetivosID: string;

  @IsNotEmpty()
  @IsMongoId()
  processoID: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsDateString()
  dataInicial: string;

  @IsNotEmpty()
  @IsDateString()
  dataFim: string;

  @IsNotEmpty()
  @IsEnum(DisciplinasCategoriaEnum)
  categoria: string;

  @IsOptional()
  @IsString()
  periodoCurricular?: string;

  @IsOptional()
  @IsEnum(DisciplinasEstadoEnum)
  estado?: string;

  @IsOptional()
  @IsString()
  campus?: string;
}
