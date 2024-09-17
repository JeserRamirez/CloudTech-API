import { Controller } from '@nestjs/common';
import { TeacherReportsService } from './teacher-reports.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teacher Reports')
@Controller('teacher-reports')
export class TeacherReportsController {
	constructor(private readonly teacherReportsService: TeacherReportsService) {}
}
