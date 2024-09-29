import { Controller } from '@nestjs/common';
import { TeacherReportsService } from './teacher-reports.service';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Teacher Reports')
@SkipThrottle({ short: true, medium: true, large: false })
@Controller('teacher-reports')
export class TeacherReportsController {
	constructor(private readonly teacherReportsService: TeacherReportsService) {}
}
