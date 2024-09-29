import { Module } from '@nestjs/common';
import { LastStudyLevelModule } from './last-study-level/last-study-level.module';
import { PreventiveDataModule } from './preventive-data/preventive-data.module';
import { StudentPersonalDataModule } from './student-personal-data/student-personal-data.module';
import { StudentTutorDataModule } from './student-tutor-data/student-tutor-data.module';

@Module({
	imports: [
		LastStudyLevelModule,
		PreventiveDataModule,
		StudentPersonalDataModule,
		StudentTutorDataModule,
	],
})
export class ApplicantModule {}
