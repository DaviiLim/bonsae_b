import { IsString, IsOptional } from 'class-validator';

export class UserUploadDto {
    @IsString()
    perfil: string;

    @IsOptional()
    @IsString()
    subperfil?: string;

    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    nDaOab?: string;

    @IsOptional()
    @IsString()
    seccionalUfOab?: string;

    @IsString()
    eMail: string;

    @IsOptional()
    @IsString()
    matriculaIes?: string;

    @IsOptional()
    @IsString()
    telefone?: string;  

    @IsOptional()
    @IsString()
    cpf?: string; 

    @IsString()
    senha: string;

    @IsOptional()
    @IsString()
    periodoCurricular?: string;

    @IsOptional()
    @IsString()
    observacoes?: string;
}