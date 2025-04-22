import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodoLetivoDto } from './create-periodo-letivo.dto';

export class UpdatePeriodoLetivoDto extends PartialType(CreatePeriodoLetivoDto) {}
