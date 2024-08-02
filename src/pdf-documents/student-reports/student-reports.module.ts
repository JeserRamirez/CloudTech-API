import { Module } from '@nestjs/common';
import { StudentReportsService } from './student-reports.service';
import { StudentReportsController } from './student-reports.controller';
import { PrinterModule } from '../printer/printer.module';

@Module({
	controllers: [StudentReportsController],
	providers: [StudentReportsService],
	imports: [PrinterModule],
})
export class StudentReportsModule {}
