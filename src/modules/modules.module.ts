import { Module } from '@nestjs/common';
import { PDFDocumentsModule } from './pdf-documents/pdf-documents.module';
import { ProfilePicturesModule } from './profile-pictures/profile-pictures.module';
import { StudentModule } from './student/student.module';
import { ApplicantModule } from './applicant/applicant.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
	imports: [
		PDFDocumentsModule,
		ProfilePicturesModule,
		StudentModule,
		ApplicantModule,
		TeacherModule,
	],
})
export class ModulesModule {}
