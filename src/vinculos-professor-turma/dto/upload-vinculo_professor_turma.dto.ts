import { IsString } from "class-validator";

export class VinculoProfessorTurmaUploadDto {
    @IsString()
    disciplinaCodigo: string;

    @IsString()
    codigoDaTurma: string;

    @IsString()
    professoresAsResponsavelEisMatriculaOuEMail: string;
}