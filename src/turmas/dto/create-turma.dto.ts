import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TurmasTurnoEnum } from "../enum/turmasTurno.enum";

export class CreateTurmaDto {

  @IsNotEmpty()
  @IsMongoId()
  disciplinaCodigo: string;

  @IsNotEmpty()
  @IsString()
  processoID: string;
  
  @IsNotEmpty()
  @IsEnum(TurmasTurnoEnum)
  turno: string;
  
  @IsNotEmpty()
  @IsString()
  turma: string;

  @IsNotEmpty()
  @IsNumber()
  codigoTurma: number;

}
