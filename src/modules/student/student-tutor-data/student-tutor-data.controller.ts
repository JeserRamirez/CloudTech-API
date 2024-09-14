import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { StudentTutorDataService } from './student-tutor-data.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { student } from '@prisma/client';
import { CreateStudentTutorDataDto, UpdateStudentTutorDataDto } from './dto';

@Controller('student-tutor-data')
export class StudentTutorDataController {
	constructor(
		private readonly studentTutorDataService: StudentTutorDataService,
	) {}

	@Get()
	@Auth(ValidRoles.student)
	async getStudentTutorData(@GetUser() user: student) {
		return this.studentTutorDataService.getStudentTutorData(user);
	}

	@Post()
	@Auth(ValidRoles.student)
	async createStudentTutorData(
		@GetUser() user: student,
		@Body() createStudentTutorDataDto: CreateStudentTutorDataDto,
	) {
		return await this.studentTutorDataService.createStudentTutorData(
			user,
			createStudentTutorDataDto,
		);
	}
	@Patch()
	@Auth(ValidRoles.student)
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
