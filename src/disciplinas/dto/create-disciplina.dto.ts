import { ArrayMinSize, IsArray, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DisciplinasCategoriaEnum } from '../enum/disciplinasCategoria.enum';
import { DisciplinasEstadoEnum } from '../enum/disciplinasEstado.enum';
import { Type } from 'class-transformer';

export class CreateDisciplinaDto {
    
  @IsNotEmpty()
  @IsMongoId()
  periodoLetivoID: string;

  @IsNotEmpty()
  @IsMongoId()
  processoID: string;

  @IsNotEmpty({ message: 'O nome é obrigatório' })
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
  @IsEnum(DisciplinasCategoriaEnum, { message: 'Essa categoria não existe !'})
  categoria: DisciplinasCategoriaEnum;

  @IsOptional()
  @IsString()
  periodoCurricular?: string;

  @IsOptional()
  @IsEnum(DisciplinasEstadoEnum, {message: 'Esse estado não existe !'})
  estado?: DisciplinasEstadoEnum;

  @IsOptional()
  @IsString()
  campus?: string;
}

export class CreateDisciplinasArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDisciplinaDto)
  @ArrayMinSize(1)
  disciplinas: CreateDisciplinaDto[];
}

