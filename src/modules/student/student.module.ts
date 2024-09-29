import { Module } from '@nestjs/common';
import { StudentPersonalDataModule } from './student-personal-data/student-personal-data.module';
import { StudentTutorDataModule } from './student-tutor-data/student-tutor-data.module';
import { PreventiveDataModule } from './preventive-data/preventive-data.module';
import { LastStudyLevelModule } from './last-study-level/last-study-level.module';

@Module({
	imports: [
		StudentPersonalDataModule,
		StudentTutorDataModule,
		PreventiveDataModule,
		LastStudyLevelModule,
	],
})
export class StudentModule {}
