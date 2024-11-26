import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { student } from '@prisma/client';

@Injectable()
export class DebtsToDepartmentsService {
	constructor(private readonly prisma: PrismaService) {}

	async getDebtsToDepartments(user: student) {
		const debts = await this.prisma.debts_to_departments.findMany({
			where: { student_id: user.student_id },
			select: {
				fees: {
					select: { semester: true, period: { select: { name: true } } },
				},
				department: true,
				description: true,
				state: true,
			},
		});

		if (!debts) {
			throw new NotFoundException('No ha sido encontrado ningun adeudo');
		}

		return { debts };
	}
}
