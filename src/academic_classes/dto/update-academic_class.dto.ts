import { PartialType } from '@nestjs/mapped-types';
import { CreateAcademicClassDto } from './create-academic_class.dto';

export class UpdateAcademicClassDto extends PartialType(CreateAcademicClassDto) {}
