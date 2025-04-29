import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

// Para uma melhor explicação, eu vou colocar o ApiProperty ! 
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  id_old_bonsae: string;

  @IsString()
  @IsNotEmpty()
  id_audora: string;

  @IsString()
  @IsNotEmpty()
  profile_id: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  registration_number: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsOptional()
  receive_emails?: boolean;

  @IsString()
  @IsNotEmpty()
  gmail: string;

  @IsString()
  @IsOptional()
  gcalendar_credentials?: string;

  @IsBoolean()
  @IsOptional()
  approve_api?: boolean;

  @IsString()
  @IsOptional()
  approve_msg?: string;

  @IsString()
  @IsOptional()
  telephone?: string;

  @IsString()
  @IsNotEmpty()
  password: string; //melhorar

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  period_id: string;

  @IsString()
  @IsOptional()
  oab?: string;

  @IsString()
  @IsOptional()
  oab_uf?: string;

  @IsString()
  @IsOptional()
  workload_real?: string;

  @IsString()
  @IsOptional()
  workload_simulated?: string;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsString()
  @IsOptional()
  profile_pic?: string;

  @IsString()
  @IsOptional()
  course?: string;

  @IsString()
  @IsOptional()
  course_id?: string;

  @IsBoolean()
  @IsOptional()
  is_admin?: boolean;

  @IsString()
  @IsOptional()
  remember_token?: string;

  @IsString()
  @IsOptional()
  access_token?: string;

  @IsString()
  @IsOptional()
  browser_agent?: string;

  @IsDate()
  @IsOptional()
  date_accept?: Date;

  @IsDate()
  @IsOptional()
  last_login?: Date;

  @IsDate()
  @IsOptional()
  last_logout?: Date;

  @IsString()
  @IsOptional()
  logged_time?: string;

  @IsString()
  @IsOptional()
  all_time_logged?: string;

  @IsString()
  @IsOptional()
  average_logged_time?: string;

  @IsOptional()
  times_active?: number;

  @IsString()
  @IsNotEmpty()
  ip: string;

  @IsBoolean()
  @IsOptional()
  permission?: boolean;

  @IsString()
  @IsOptional()
  integration?: string;

  @IsOptional()
  deleted_at?: Date;
}

// DTO para atualização de usuário (todos os campos opcionais)
export class UpdateUserDto extends PartialType(CreateUserDto) {}