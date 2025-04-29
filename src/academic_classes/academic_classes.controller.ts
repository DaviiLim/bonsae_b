import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademicClassesService } from './academic_classes.service';
import { CreateAcademicClassDto } from './dto/create-academic_class.dto';
import { UpdateAcademicClassDto } from './dto/update-academic_class.dto';

@Controller('academic-classes')
export class AcademicClassesController {
  constructor(private readonly academicClassesService: AcademicClassesService) {}

  @Post()
  create(@Body() createAcademicClassDto: CreateAcademicClassDto) {
    return this.academicClassesService.create(createAcademicClassDto);
  }

  @Get()
  findAll() {
    return this.academicClassesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicClassesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcademicClassDto: UpdateAcademicClassDto) {
    return this.academicClassesService.update(id, updateAcademicClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicClassesService.remove(id);
  }
}
