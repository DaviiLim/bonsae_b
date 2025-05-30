import { IsEnum, IsNotEmpty, IsOptional, IsString, IsEmail, IsArray, ValidateNested, IsMongoId, ArrayMinSize } from 'class-validator';
import { UsuariosPerfilEnum } from '../enum/usuariosPerfil.enum';
import { Type } from 'class-transformer';

export class CreateUsuarioDto {

  @IsNotEmpty()
  @IsEnum(UsuariosPerfilEnum)
  perfil: UsuariosPerfilEnum;

  @IsOptional()
  @IsString()
  subperfil?: string;

  @IsNotEmpty()
  @IsMongoId()
  processoID: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  numeroOAB?: string;

  @IsOptional()
  @IsString()
  seccionalOAB?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  matriculaIES?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

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

export class CreateUsuariosArrayDto {
  @ValidateNested({ each: true })
  @Type(() => CreateUsuarioDto)
  @ArrayMinSize(1)
  usuarios: CreateUsuarioDto[];
}
