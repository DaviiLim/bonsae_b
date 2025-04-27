import { Injectable } from '@nestjs/common';
import { CreateAcademicClassDto } from './dto/create-academic_class.dto';
import { UpdateAcademicClassDto } from './dto/update-academic_class.dto';

@Injectable()
export class AcademicClassesService {
  create(createAcademicClassDto: CreateAcademicClassDto) {
    return 'This action adds a new academicClass';
  }

  findAll() {
    return `This action returns all academicClasses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} academicClass`;
  }

  update(id: number, updateAcademicClassDto: UpdateAcademicClassDto) {
    return `This action updates a #${id} academicClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} academicClass`;
  }
}
