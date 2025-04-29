import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolPeriodsService } from './school_periods.service';
import { SchoolPeriodsController } from './school_periods.controller';
import { SchoolPeriod, SchoolPeriodSchema } from './schema/shool_periods.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SchoolPeriod.name, schema: SchoolPeriodSchema },
    ]),
  ],
  controllers: [SchoolPeriodsController],
  providers: [SchoolPeriodsService],
})
export class SchoolPeriodsModule {}
