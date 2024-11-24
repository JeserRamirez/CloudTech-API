import { Controller, Get } from '@nestjs/common';
import { DebtsToDepartmentsService } from './debts-to-departments.service';
import { student } from '@prisma/client';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('student/debts-to-departments')
export class DebtsToDepartmentsController {
	constructor(
		private readonly debtsToDepartmentsService: DebtsToDepartmentsService,
	) {}

	@Get()
	@Auth(ValidRoles.student)
	async getDebtsToDepartments(@GetUser() user: student) {
		return await this.debtsToDepartmentsService.getDebtsToDepartments(user);
	}
}
