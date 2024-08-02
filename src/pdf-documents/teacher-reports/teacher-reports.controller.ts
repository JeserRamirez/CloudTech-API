import { Controller } from '@nestjs/common';
import { TeacherReportsService } from './teacher-reports.service';

@Controller('teacher-reports')
export class TeacherReportsController {
	constructor(private readonly teacherReportsService: TeacherReportsService) {}
}
