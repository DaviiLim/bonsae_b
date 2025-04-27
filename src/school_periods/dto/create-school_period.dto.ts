import { IsString, IsNotEmpty, IsDateString, IsOptional, IsISO8601 } from 'class-validator';

export class CreateSchoolPeriodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  school_period: string;

  @IsISO8601({ strict: true }) 
  @IsNotEmpty()
  start_date: string;

  @IsISO8601({ strict: true })
  @IsNotEmpty()
  final_date: string;

  @IsOptional()
  @IsDateString()
  deleted_at?: string;
}
