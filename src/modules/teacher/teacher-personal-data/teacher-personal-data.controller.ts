import { Body, Controller, Get, Patch, Post, UsePipes } from '@nestjs/common';
import { TeacherPersonalDataService } from './teacher-personal-data.service';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth, GetUser } from 'src/auth/decorators';
import { teacher } from '@prisma/client';
import {
	CreateTeacherPersonalDataDto,
	UpdateTeacherPersonalDataDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import { TrimPipe } from 'src/common/pipes';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Teacher Personal Data')
@SkipThrottle({ short: true, medium: false, large: true })
@Controller('teacher-personal-data')
export class TeacherPersonalDataController {
	constructor(
		private readonly teacherPersonalDataService: TeacherPersonalDataService,
	) {}

	@Get()
	@Auth(ValidRoles.teacher)
	async getTeacherPersonalData(@GetUser() user: teacher) {
		return await this.teacherPersonalDataService.getTeacherPersonalData(user);
	}

	@Post()
	@Auth(ValidRoles.teacher)
	@UsePipes(new TrimPipe())
	async createTeacherPersonalData(
		@GetUser() user: teacher,
		@Body() createTeacherPersonalDataDto: CreateTeacherPersonalDataDto,
	) {
		return await this.teacherPersonalDataService.createTeacherPersonalData(
			user,
			createTeacherPersonalDataDto,
		);
	}

	@Patch()
	@Auth(ValidRoles.teacher)
	@UsePipes(new TrimPipe())
	async updateStudentPersonalData(
		@GetUser() user: teacher,
		@Body() updateTeacherPersonalDataDto: UpdateTeacherPersonalDataDto,
	) {
		return await this.teacherPersonalDataService.updateTeacherPersonalData(
			user,
			updateTeacherPersonalDataDto,
		);
	}
}
