import { Module } from '@nestjs/common';
import { AcademicClassesService } from './academic_classes.service';
import { AcademicClassesController } from './academic_classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademicClasses, AcademicClassSchema } from './schema/academic_classes.schema';

@Module({
  imports: [
        MongooseModule.forFeature([
          { name: AcademicClasses.name, schema: AcademicClassSchema },
        ]),
      ],
  controllers: [AcademicClassesController],
  providers: [AcademicClassesService],
})
export class AcademicClassesModule {}
