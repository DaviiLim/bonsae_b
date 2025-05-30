import { Type } from 'class-transformer';
import { ArrayMinSize, IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

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

export class CreateVinculosArrayDto {
  @ValidateNested({ each: true })
  @Type(() => CreateVinculoDto)
  @ArrayMinSize(1)
  usuarios: CreateVinculoDto[];
}
