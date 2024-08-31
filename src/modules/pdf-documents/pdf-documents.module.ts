import { Module } from '@nestjs/common';
import { PrinterModule } from './printer/printer.module';
import { StudentReportsModule } from './student-reports/student-reports.module';
import { TeacherReportsModule } from './teacher-reports/teacher-reports.module';

@Module({
	imports: [PrinterModule, StudentReportsModule, TeacherReportsModule],
})
export class PDFDocumentsModule {}
