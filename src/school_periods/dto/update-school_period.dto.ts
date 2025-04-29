import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolPeriodDto } from './create-school_period.dto';

export class UpdateSchoolPeriodDto extends PartialType(CreateSchoolPeriodDto) {}