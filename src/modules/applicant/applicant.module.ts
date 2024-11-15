import { Module } from '@nestjs/common';
import { LastStudyLevelModule } from './last-study-level/last-study-level.module';
import { PreventiveDataModule } from './preventive-data/preventive-data.module';
import { StudentPersonalDataModule } from './student-personal-data/student-personal-data.module';
import { StudentTutorDataModule } from './student-tutor-data/student-tutor-data.module';
import { PreApplicationModule } from './pre-application/pre-application.module';
import { InscriptionModule } from './inscription/inscription.module';

@Module({
	imports: [
		LastStudyLevelModule,
		PreventiveDataModule,
		StudentPersonalDataModule,
		StudentTutorDataModule,
		PreApplicationModule,
		InscriptionModule,
	],
})
export class ApplicantModule {}
