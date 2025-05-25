import { IsEnum, IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';
import { UsuariosPerfilEnum } from '../enum/usuariosPerfil.enum';

export class CreateUsuarioDto {

  @IsNotEmpty()
  @IsEnum(UsuariosPerfilEnum)
  perfil: UsuariosPerfilEnum;

  @IsOptional()
  @IsString()
  subperfil?: string;

  @IsNotEmpty()
  @IsString()
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

  @IsOptional()
  @IsString()
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
