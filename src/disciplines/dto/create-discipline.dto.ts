import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateDisciplineDto {
  @IsString()
  @IsNotEmpty()
  school_period_id: string;

  @IsString()
  @IsNotEmpty()
  academic_class_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  shift: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsBoolean()
  is_exceptional?: boolean;

  @IsOptional()
  @IsString()
  integration?: string;
}
