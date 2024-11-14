import { Module } from '@nestjs/common';
import { StudentPersonalDataModule } from './student-personal-data/student-personal-data.module';
import { StudentTutorDataModule } from './student-tutor-data/student-tutor-data.module';
import { PreventiveDataModule } from './preventive-data/preventive-data.module';
import { LastStudyLevelModule } from './last-study-level/last-study-level.module';
import { TeacherEvaluationModule } from './teacher-evaluation/teacher-evaluation.module';
import { ComplementaryActivitiesModule } from './complementary-activities/complementary-activities.module';

@Module({
	imports: [
		StudentPersonalDataModule,
		StudentTutorDataModule,
		PreventiveDataModule,
		LastStudyLevelModule,
		TeacherEvaluationModule,
		ComplementaryActivitiesModule,
	],
})
export class StudentModule {}
