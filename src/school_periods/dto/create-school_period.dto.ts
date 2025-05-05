import { IsString, IsNotEmpty, IsEnum, IsDateString, IsNumber } from 'class-validator';

export class CreateSchoolPeriodDto {
  @IsNumber()
  @IsNotEmpty()
  identificacao: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum([
    '1º Semestre',
    '2º Semestre',
    '1º Semestre - 1º Bimestre',
    '1º Semestre - 2º Bimestre',
    '2º Semestre - 1º Bimestre',
    '2º Semestre - 2º Bimestre',
  ])
  periodoLetivo: string;

@IsDateString({}, { message: 'start_date deve estar no formato ISO !' })
@IsNotEmpty()
start_date: string;

@IsDateString({}, { message: 'final_date deve estar no formato ISO !' })
@IsNotEmpty()
final_date: string;

}
