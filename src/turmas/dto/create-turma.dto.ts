import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateTurmaDto {
    @IsNotEmpty()
    @IsString()
    codigoTurma: string;
  
    @IsNotEmpty()
    @IsString()
    turno: string;
  
    @IsNotEmpty()
    @IsMongoId()
    disciplina: string;
  
    @IsNotEmpty()
    @IsMongoId()
    processo: string;
}