import { Body, Controller, Get, Patch, UsePipes } from '@nestjs/common';
import { StudentTutorDataService } from './student-tutor-data.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { student } from '@prisma/client';
import { UpdateStudentTutorDataDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { TrimPipe } from 'src/common/pipes';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Student Tutor Data')
@SkipThrottle({ short: true, medium: false, large: true })
@Controller('student/student-tutor-data')
export class StudentTutorDataController {
	constructor(
		private readonly studentTutorDataService: StudentTutorDataService,
	) {}

	@Get()
	@Auth(ValidRoles.student)
	async getStudentTutorData(@GetUser() user: student) {
		return this.studentTutorDataService.getStudentTutorData(user);
	}

	@Patch()
	@Auth(ValidRoles.student)
	@UsePipes(new TrimPipe())
	async updateStudentTutorData(
		@GetUser() user: student,
		@Body() updateStudentTutorDataDto: UpdateStudentTutorDataDto,
	) {
		return await this.studentTutorDataService.updateStudentTutorData(
			user,
			updateStudentTutorDataDto,
		);
	}
}
