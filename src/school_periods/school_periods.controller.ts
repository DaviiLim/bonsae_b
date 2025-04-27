import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchoolPeriodsService } from './school_periods.service';
import { CreateSchoolPeriodDto } from './dto/create-school_period.dto';
import { UpdateSchoolPeriodDto } from './dto/update-school_period.dto';

@Controller('school-periods')
export class SchoolPeriodsController {
  constructor(private readonly schoolPeriodsService: SchoolPeriodsService) {}

  @Post()
  create(@Body() createSchoolPeriodDto: CreateSchoolPeriodDto) {
    return this.schoolPeriodsService.create(createSchoolPeriodDto);
  }
  
  @Get()
  findAll() {
    return this.schoolPeriodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolPeriodsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolPeriodDto: UpdateSchoolPeriodDto) {
    return this.schoolPeriodsService.update(id, updateSchoolPeriodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolPeriodsService.remove(id);
  }
}
