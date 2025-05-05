import { IsNotEmpty, IsString,IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateAcademicClassDto {
  @IsNumber()
  @IsNotEmpty()
  schoolPeriodId: number;

  @IsString()
  @IsNotEmpty()
  disciplina: string;

  @IsNumber()
  @IsNotEmpty()
  codigoDisciplina: number;

  @IsDateString({}, { message: 'start_date deve estar no formato ISO !' })
  @IsNotEmpty()
  start_date: string;
  
  @IsDateString({}, { message: 'final_date deve estar no formato ISO !' })
  @IsNotEmpty()
  final_date: string;  

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsOptional()
  periodoCurricular?: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  campus?: string;
}
