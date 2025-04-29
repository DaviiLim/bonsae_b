import { PartialType } from '@nestjs/mapped-types';
import { CreateDisciplineUserDto } from './create-discipline_user.dto';

export class UpdateDisciplineUserDto extends PartialType(CreateDisciplineUserDto) {}
