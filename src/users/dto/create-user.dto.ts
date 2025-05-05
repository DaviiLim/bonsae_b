import { 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Matches 
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  perfil: string;

  @IsOptional()
  @IsString()
  subperfil?: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  numeroOab?: string;

  @IsOptional()
  @IsString()
  seccionalOab?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  matriculaIES?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/, {
    message: 'Telefone inválido',
  })
  telefone?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF inválido',
  })
  cpf?: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsOptional()
  @IsString()
  periodoCurricular?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;
}
