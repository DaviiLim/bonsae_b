import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodosLetivoDto } from './create-periodos-letivo.dto';

export class UpdatePeriodosLetivoDto extends PartialType(CreatePeriodosLetivoDto) {}
