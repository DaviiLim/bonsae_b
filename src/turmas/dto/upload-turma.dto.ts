import { IsOptional, IsString } from "class-validator";

export class TurmaUploadDto {
    @IsString()
    disciplinaCodigo: string;

    @IsOptional()
    @IsString()
    turno?: string;

    @IsString()
    turma: string;

    @IsString()
    codigoDaTurma: string;
}