import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreatePeriodoLetivoDto {
  
  @IsNotEmpty()
  @IsString()
  identificacao: string;

  @IsString()
  periodo: string;


}
