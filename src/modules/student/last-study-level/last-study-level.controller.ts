import { Body, Controller, Get, Patch, UsePipes } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { student } from '@prisma/client';
import { LastStudyLevelService } from './last-study-level.service';
import { UpdateLastStudyLevelDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { TrimPipe } from 'src/common/pipes';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Student Last Study Level')
@SkipThrottle({ short: true, medium: false, large: true })
@Controller('student/last-study-level')
export class LastStudyLevelController {
	constructor(private readonly lastStudyLevelService: LastStudyLevelService) {}

	@Get()
	@Auth(ValidRoles.student)
	async getLastStudyLevel(@GetUser() user: student) {
		return this.lastStudyLevelService.getLastStudyLevel(user);
	}

	@Patch()
	@Auth(ValidRoles.student)
	@UsePipes(new TrimPipe())
	async updateLastStudyLevel(
		@GetUser() user: student,
		@Body() updateLastStudyLevelDto: UpdateLastStudyLevelDto,
	) {
		return await this.lastStudyLevelService.updateLastStudyLevel(
			user,
			updateLastStudyLevelDto,
		);
	}
}
