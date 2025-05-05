import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDisciplineDto {
  @IsNumber()
  @IsNotEmpty()
  codigoDisciplina: number;

  @IsNumber()
  @IsNotEmpty()
  codigoTurma: number;

  @IsString()
  @IsOptional()
  turno?: string;

  @IsString()
  @IsOptional()
  turma: string;
}