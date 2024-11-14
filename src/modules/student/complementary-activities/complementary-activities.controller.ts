import { Controller, Get } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { student } from '@prisma/client';
import { ComplementaryActivitiesService } from './complementary-activities.service';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('student/complementary-activities')
export class ComplementaryActivitiesController {
	constructor(
		private readonly complementaryActivitiesService: ComplementaryActivitiesService,
	) {}

	@Get()
	@Auth(ValidRoles.student)
	async getAllComplementaryActivities(@GetUser() user: student) {
		return this.complementaryActivitiesService.getAllComplementaryActivities(
			user,
		);
	}
}
