import { IsEmail, IsMongoId } from 'class-validator';

export class CreateVinculoDto {
  @IsEmail()
  email: string;

  @IsMongoId()
  disciplinaID: string;

  @IsMongoId()
  turmaID: string;
}
