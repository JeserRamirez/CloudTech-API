import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { student } from '@prisma/client';

@Injectable()
export class ScholarInfoService {
	constructor(private readonly prisma: PrismaService) {}

	async getStudentInfo(user: student) {
		const scholar_info = await this.prisma.general_data.findFirst({
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

		if (!scholar_info) {
			throw new NotFoundException(
				'No ha sido encontrada la informacion escolar del usuario',
			);
		}

		return scholar_info;
	}
}
