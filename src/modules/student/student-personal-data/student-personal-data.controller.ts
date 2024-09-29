import { Body, Controller, Get, Patch, UsePipes } from '@nestjs/common';
import { StudentPersonalDataService } from './student-personal-data.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { student } from '@prisma/client';
import { UpdateStudentPersonalDataDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { TrimPipe } from 'src/common/pipes';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Student Personal Data')
@SkipThrottle({ short: true, medium: false, large: true })
@Controller('student/student-personal-data')
export class StudentPersonalDataController {
	constructor(
		private readonly studentPersonalDataService: StudentPersonalDataService,
	) {}

	@Get()
	@Auth(ValidRoles.student)
	async getStudentPersonalData(@GetUser() user: student) {
		return await this.studentPersonalDataService.getStudentPersonalData(user);
	}

	@Patch()
	@Auth(ValidRoles.student)
	@UsePipes(new TrimPipe())
	async updateStudentPersonalData(
		@GetUser() user: student,
		@Body() updateStudentPersonalDataDto: UpdateStudentPersonalDataDto,
	) {
		return await this.studentPersonalDataService.updateStudentPersonalData(
			user,
			updateStudentPersonalDataDto,
		);
	}
}
