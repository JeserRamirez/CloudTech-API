import { Module } from '@nestjs/common';
import { TeacherReportsService } from './teacher-reports.service';
import { TeacherReportsController } from './teacher-reports.controller';

@Module({
  controllers: [TeacherReportsController],
  providers: [TeacherReportsService],
})
export class TeacherReportsModule {}
