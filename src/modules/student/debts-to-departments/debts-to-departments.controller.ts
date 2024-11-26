import { Controller, Get } from '@nestjs/common';
import { DebtsToDepartmentsService } from './debts-to-departments.service';
import { student } from '@prisma/client';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Debts To Departments')
@Controller('student/debts-to-departments')
export class DebtsToDepartmentsController {
	constructor(
		private readonly debtsToDepartmentsService: DebtsToDepartmentsService,
	) {}

	@Get()
	@ApiResponse({
		status: 200,
		content: {
			'application/json': {
				example: {
					debts: [
						{
							fees: {
								semester: '2',
								period: {
									name: 'AGODIC2024',
								},
							},
							department: 'recursos financieros',
							description: 'pago parcial',
							state: 'pendiente',
						},
						{
							fees: {
								semester: '3',
								period: {
									name: 'AGODIC2025',
								},
							},
							department: 'recursos financieros',
							description: 'pago parcial',
							state: 'pendiente',
						},
					],
				},
			},
		},
	})
	@Auth(ValidRoles.student)
	async getDebtsToDepartments(@GetUser() user: student) {
		return await this.debtsToDepartmentsService.getDebtsToDepartments(user);
	}
}
