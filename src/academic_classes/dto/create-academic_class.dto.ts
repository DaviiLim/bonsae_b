import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAcademicClassDto {

  @IsString()
  school_period_id: string;

  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsDateString()
  start_date: Date;

  @IsDateString()
  end_date: Date;

  @IsString()
  category: string;

  @IsString()
  course: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_exceptional?: boolean;

  @IsString()
  period: string;

  @IsString()
  campus_id: string;

  @IsString()
  @IsOptional()
  integration?: string;
}
