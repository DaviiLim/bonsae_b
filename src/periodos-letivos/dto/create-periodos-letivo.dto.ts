import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PeriodoLetivoEnum } from "../enum/periodo-letivo.enum";

export class CreatePeriodosLetivoDto {
  
  @IsNotEmpty()
  @IsString()
  identificacao: string;

  @IsNotEmpty()
  @IsEnum(PeriodoLetivoEnum)
  periodoLetivo: PeriodoLetivoEnum;

  @IsNotEmpty()
  @IsDateString()
  dataInicial: string;

  @IsNotEmpty()
  @IsDateString()
  dataFim: string;
}
