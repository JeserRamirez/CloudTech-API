import { Module } from '@nestjs/common';
import { TeacherPersonalDataModule } from './teacher-personal-data/teacher-personal-data.module';
import { JobDataModule } from './job-data/job-data.module';

@Module({
	imports: [TeacherPersonalDataModule, JobDataModule],
})
export class TeacherModule {}
