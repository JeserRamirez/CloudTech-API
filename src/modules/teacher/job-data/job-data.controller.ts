import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { JobDataService } from './job-data.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { teacher } from '@prisma/client';
import { CreateJobDataDto, UpdateJobDataDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teacher Job Data')
@Controller('job-data')
export class JobDataController {
	constructor(private readonly jobDataService: JobDataService) {}

	@Get()
	@Auth(ValidRoles.teacher)
	async getJobData(@GetUser() user: teacher) {
		return await this.jobDataService.getJobData(user);
	}

	@Post()
	@Auth(ValidRoles.teacher)
	async createJobData(
		@GetUser() user: teacher,
		@Body() createJobDataDto: CreateJobDataDto,
	) {
		return await this.jobDataService.createJobData(user, createJobDataDto);
	}

	@Patch()
	@Auth(ValidRoles.teacher)
	async updateStudentPersonalData(
		@GetUser() user: teacher,
		@Body() updateJobDataDto: UpdateJobDataDto,
	) {
		return await this.jobDataService.updateJobData(user, updateJobDataDto);
	}
}
