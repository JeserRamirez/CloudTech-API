import { Body, Controller, Get, Patch, UsePipes } from '@nestjs/common';
import { StudentTutorDataService } from './student-tutor-data.service';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { applicant } from '@prisma/client';
import { TrimPipe } from 'src/common/pipes';
import { UpdateStudentTutorDataDto } from './dto';

@ApiTags('Applicant Tutor Data')
@SkipThrottle({ short: true, medium: false, large: true })
@Controller('applicant/student-tutor-data')
export class StudentTutorDataController {
	constructor(
		private readonly studentTutorDataService: StudentTutorDataService,
	) {}

	@Get()
	@Auth(ValidRoles.applicant)
	async getStudentTutorData(@GetUser() user: applicant) {
		return this.studentTutorDataService.getStudentTutorData(user);
	}

	@Patch()
	@Auth(ValidRoles.applicant)
	@UsePipes(new TrimPipe())
	async updateStudentTutorData(
		@GetUser() user: applicant,
		@Body() updateStudentTutorDataDto: UpdateStudentTutorDataDto,
	) {
		return await this.studentTutorDataService.updateStudentTutorData(
			user,
			updateStudentTutorDataDto,
		);
	}
}
