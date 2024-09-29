import { Body, Controller, Get, Patch, UsePipes } from '@nestjs/common';
import { PreventiveDataService } from './preventive-data.service';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { applicant } from '@prisma/client';
import { UpdatePreventiveDataDto } from './dto';
import { TrimPipe } from 'src/common/pipes';

@ApiTags('Applicant Preventive Data')
@SkipThrottle({ short: true, medium: false, large: true })
@Controller('applicant/preventive-data')
export class PreventiveDataController {
	constructor(private readonly preventiveDataService: PreventiveDataService) {}

	@Get()
	@Auth(ValidRoles.applicant)
	async getPreventiveData(@GetUser() user: applicant) {
		return await this.preventiveDataService.getPreventiveData(user);
	}

	@Patch()
	@Auth(ValidRoles.applicant)
	@UsePipes(new TrimPipe())
	async updatePreventiveData(
		@GetUser() user: applicant,
		@Body() updatePreventiveDataDto: UpdatePreventiveDataDto,
	) {
		return await this.preventiveDataService.updatePreventiveData(
			user,
			updatePreventiveDataDto,
		);
	}
}
