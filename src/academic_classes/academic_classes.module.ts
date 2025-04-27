import { Module } from '@nestjs/common';
import { AcademicClassesService } from './academic_classes.service';
import { AcademicClassesController } from './academic_classes.controller';

@Module({
  controllers: [AcademicClassesController],
  providers: [AcademicClassesService],
})
export class AcademicClassesModule {}
