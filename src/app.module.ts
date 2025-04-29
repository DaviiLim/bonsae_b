import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolPeriodsModule } from './school_periods/school_periods.module';
import { AcademicClassesModule } from './academic_classes/academic_classes.module';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { DisciplineUsersModule } from './discipline_users/discipline_users.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PeriodoLetivoModule,
    MongooseModule.forRoot('mongodb://localhost:27017/bonsae_db')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
