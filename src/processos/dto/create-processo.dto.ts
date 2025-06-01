import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { ProcessosStatusEnum } from '../enum/processosStatus.enum';

export class CreateProcessoDto {
  @IsString()
  @IsNotEmpty()
  processoID: string; 
  
  @IsDateString()
  @IsOptional()
  dataInicio?: string;

  @IsDateString()
  @IsOptional()
  dataFim?: string;

  @IsEnum(ProcessosStatusEnum)
  @IsOptional()
  status?: ProcessosStatusEnum; 
}