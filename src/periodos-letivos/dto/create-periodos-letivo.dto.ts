import { IsString, IsDateString } from 'class-validator';

export class CreatePeriodosLetivoDto {
    @IsString()
    periodoLetivo: string;

    @IsDateString()
    dataInicial: string;

    @IsDateString()
    dataFinal: string;
}
