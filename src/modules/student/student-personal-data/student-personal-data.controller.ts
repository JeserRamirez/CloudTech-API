import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { StudentPersonalDataService } from './student-personal-data.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { student } from '@prisma/client';
import {
	CreateStudentPersonalDataDto,
	UpdateStudentPersonalDataDto,
} from './dto';

@Controller('student-personal-data')
export class StudentPersonalDataController {
	constructor(
		private readonly studentPersonalDataService: StudentPersonalDataService,
	) {}

	@Get()
	@Auth(ValidRoles.student)
	async getStudentPersonalData(@GetUser() user: student) {
		return await this.studentPersonalDataService.getStudentPersonalData(user);
	}
	@Post()
	@Auth(ValidRoles.student)
	async createStudentPersonalData(
		@GetUser() user: student,
		@Body() createStudentPersonalDataDto: CreateStudentPersonalDataDto,
	) {
		return await this.studentPersonalDataService.createStudentPersonalData(
			user,
			createStudentPersonalDataDto,
		);
	}
	@Patch()
	@Auth(ValidRoles.student)
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
