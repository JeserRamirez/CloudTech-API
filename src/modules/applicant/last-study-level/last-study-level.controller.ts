import { Body, Controller, Get, Patch, UsePipes } from '@nestjs/common';
import { LastStudyLevelService } from './last-study-level.service';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { applicant } from '@prisma/client';
import { TrimPipe } from 'src/common/pipes';
import { UpdateLastStudyLevelDto } from './dto';

@ApiTags('Applicant Last Study Level')
@SkipThrottle({ short: true, medium: false, large: true })
@Controller('applicant/last-study-level')
export class LastStudyLevelController {
	constructor(private readonly lastStudyLevelService: LastStudyLevelService) {}

	@Get()
	@Auth(ValidRoles.applicant)
	async getLastStudyLevel(@GetUser() user: applicant) {
		return this.lastStudyLevelService.getLastStudyLevel(user);
	}

	@Patch()
	@Auth(ValidRoles.applicant)
	@UsePipes(new TrimPipe())
	async updateLastStudyLevel(
		@GetUser() user: applicant,
		@Body() updateLastStudyLevelDto: UpdateLastStudyLevelDto,
	) {
		return await this.lastStudyLevelService.updateLastStudyLevel(
			user,
			updateLastStudyLevelDto,
		);
	}
}
