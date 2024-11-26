import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentInfoService } from '../services/student-info/student-info.service';
import { student } from '@prisma/client';

@Injectable()
export class DebtsToDepartmentsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly studentInfo: StudentInfoService,
	) {}

	async getDebtsToDepartments(user: student) {
		const scholar_student_info = await this.studentInfo.getStudentInfo(user);

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

		return { scholar_student_info, debts };
	}
}
