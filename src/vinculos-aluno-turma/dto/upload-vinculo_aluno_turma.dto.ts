import { IsString } from "class-validator";

export class VinculoAlunoTurmaUploadDto {
    @IsString()
    disciplinaCodigo: string;

    @IsString()
    codigoDaTurma: string;

    @IsString()
    matriculaIesOuEMailDoAluno: string;
}