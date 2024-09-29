import { Body, Controller, Get, Patch, UsePipes } from '@nestjs/common';
import { PreventiveDataService } from './preventive-data.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { student } from '@prisma/client';
import { ValidRoles } from 'src/auth/interfaces';
import { UpdatePreventiveDataDto } from './dto/update-preventive-data.dto';
import { ApiTags } from '@nestjs/swagger';
import { TrimPipe } from 'src/common/pipes';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Student Preventive Data')
@SkipThrottle({ short: true, medium: false, large: true })
@Controller('student/preventive-data')
export class PreventiveDataController {
	constructor(private readonly preventiveDataService: PreventiveDataService) {}

	@Get()
	@Auth(ValidRoles.student)
	async getPreventiveData(@GetUser() user: student) {
		return await this.preventiveDataService.getPreventiveData(user);
	}

	@Patch()
	@Auth(ValidRoles.student)
	@UsePipes(new TrimPipe())
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
