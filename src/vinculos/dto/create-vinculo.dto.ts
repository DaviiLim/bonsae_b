import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVinculoDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  matriculaIES: string;

  @IsNotEmpty()
  @IsMongoId()
  disciplinaID: string;

  @IsNotEmpty()
  @IsMongoId()
  turmaID: string;
}
