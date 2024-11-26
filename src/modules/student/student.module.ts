import { Module } from '@nestjs/common';
import { StudentPersonalDataModule } from './student-personal-data/student-personal-data.module';
import { StudentTutorDataModule } from './student-tutor-data/student-tutor-data.module';
import { PreventiveDataModule } from './preventive-data/preventive-data.module';
import { LastStudyLevelModule } from './last-study-level/last-study-level.module';
import { TeacherEvaluationModule } from './teacher-evaluation/teacher-evaluation.module';
import { ComplementaryActivitiesModule } from './complementary-activities/complementary-activities.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DebtsToDepartmentsModule } from './debts-to-departments/debts-to-departments.module';
import { PaymentOfServicesModule } from './payment-of-services/payment-of-services.module';
import { ScheduleModule } from './schedule-grades/schedule.module';
import { ScholarInfoModule } from './scholar-info/scholar-info.module';

@Module({
	imports: [
		StudentPersonalDataModule,
		StudentTutorDataModule,
		PreventiveDataModule,
		LastStudyLevelModule,
		TeacherEvaluationModule,
		ComplementaryActivitiesModule,
		PrismaModule,
		DebtsToDepartmentsModule,
		PaymentOfServicesModule,
		ScheduleModule,
		ScholarInfoModule,
	],
})
export class StudentModule {}
