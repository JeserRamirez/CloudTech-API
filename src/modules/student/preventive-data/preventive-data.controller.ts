import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { PreventiveDataService } from './preventive-data.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { student } from '@prisma/client';
import { ValidRoles } from 'src/auth/interfaces';
import { CreatePreventiveDataDto } from './dto';
import { UpdatePreventiveDataDto } from './dto/update-preventive-data.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Student Preventive Data')
@Controller('preventive-data')
export class PreventiveDataController {
	constructor(private readonly preventiveDataService: PreventiveDataService) {}

	@Get()
	@Auth(ValidRoles.student)
	async getPreventiveData(@GetUser() user: student) {
		return await this.preventiveDataService.getPreventiveData(user);
	}
	@Post()
	@Auth(ValidRoles.student)
	async createPreventiveData(
		@GetUser() user: student,
		@Body() createPreventiveDataDto: CreatePreventiveDataDto,
	) {
		return await this.preventiveDataService.createPreventiveData(
			user,
			createPreventiveDataDto,
		);
	}
	@Patch()
	@Auth(ValidRoles.student)
	async updatePreventiveData(
		@GetUser() user: student,
		@Body() updatePreventiveDataDto: UpdatePreventiveDataDto,
	) {
		return await this.preventiveDataService.updatePreventiveData(
			user,
			updatePreventiveDataDto,
		);
	}
}
