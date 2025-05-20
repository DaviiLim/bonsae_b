import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { ProcessosStatusEnum } from '../enum/processosStatus.enum';

export class CreateProcessoDto {
  @IsString()
  @IsNotEmpty()
  processoID: string; 
  
  @IsDateString()
  @IsOptional()
  dataInicio?: Date;

  @IsDateString()
  @IsOptional()
  dataFim?: Date;

  @IsEnum(ProcessosStatusEnum)
  @IsOptional()
  status?: ProcessosStatusEnum; 
}