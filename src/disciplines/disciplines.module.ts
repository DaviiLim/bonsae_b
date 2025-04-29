import { Module } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { DisciplinesController } from './disciplines.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Discipline, DisciplineSchema } from './schema/disciplines.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Discipline.name, schema: DisciplineSchema },
      ]),
    ],
  controllers: [DisciplinesController],
  providers: [DisciplinesService],
})
export class DisciplinesModule {}
