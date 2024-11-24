import { Injectable } from '@nestjs/common';
import { student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentInfoService {
	constructor(private readonly prisma: PrismaService) {}

	async getStudentInfo(user: student) {
		return await this.prisma.general_data.findFirst({
			where: { student_id: user.student_id },
			select: {
				student: {
					select: { control_number: true },
				},
				student_personal_data: {
					select: { firstname: true, lastname: true, curp: true },
				},
				student_kardex_plan: {
					select: {
						study_plan: {
							select: {
								name: true,
								carrer: {
									select: {
										carrer_name: true,
										student_current_status: { select: { semester: true } },
									},
								},
							},
						},
					},
				},
			},
		});
	}
}
