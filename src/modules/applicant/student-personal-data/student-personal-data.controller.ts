import { Body, Controller, Get, Patch, UsePipes } from '@nestjs/common';
import { StudentPersonalDataService } from './student-personal-data.service';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { applicant } from '@prisma/client';
import { TrimPipe } from 'src/common/pipes';
import { UpdateStudentPersonalDataDto } from './dto';

@ApiTags('Applicant Personal Data')
@SkipThrottle({ short: true, medium: false, large: true })
@Controller('applicant/student-personal-data')
export class StudentPersonalDataController {
	constructor(
		private readonly studentPersonalDataService: StudentPersonalDataService,
	) {}

	@Get()
	@Auth(ValidRoles.applicant)
	async getStudentPersonalData(@GetUser() user: applicant) {
		return await this.studentPersonalDataService.getStudentPersonalData(user);
	}

	@Patch()
	@Auth(ValidRoles.applicant)
	@UsePipes(new TrimPipe())
	async updateStudentPersonalData(
		@GetUser() user: applicant,
		@Body() updateStudentPersonalDataDto: UpdateStudentPersonalDataDto,
	) {
		return await this.studentPersonalDataService.updateStudentPersonalData(
			user,
			updateStudentPersonalDataDto,
		);
	}
}
