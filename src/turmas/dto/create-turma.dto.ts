import { ArrayMinSize, IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { TurmasTurnoEnum } from "../enum/turmasTurno.enum";
import { Type } from "class-transformer";

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
  codigo: number;

}

export class CreateTurmaArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTurmaDto)
  @ArrayMinSize(1)
  turmas: CreateTurmaDto[];
}