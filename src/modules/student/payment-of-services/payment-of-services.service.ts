import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentInfoService } from '../services/student-info/student-info.service';
import { student } from '@prisma/client';

@Injectable()
export class PaymentOfServicesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly studentInfo: StudentInfoService,
	) {}

	async getPaymentInformation(user: student) {
		const student_info = await this.studentInfo.getStudentInfo(user);

		const payment_iformation = '';

		return { student_info };
	}

	async getPaymentDetails(user: student) {
		const student_info = await this.studentInfo.getStudentInfo(user);

		const student_current_status = await this.prisma.student
			.findFirst({
				where: {
					student_id: user.student_id,
				},
				select: {
					general_data: {
						select: { scholar_data: { select: { current_period: true } } },
					},
					student_current_status: {
						select: { semester: true },
					},
				},
			})
			.then((data) => {
				return [
					data?.general_data[0]?.scholar_data[0]?.current_period,
					data?.student_current_status[0]?.semester,
				];
			});

		const details = await this.prisma.student_payment_reinscription.findFirst({
			where: {
				AND: [
					{ student_id: user.student_id },
					{
						fees: {
							AND: [
								{ fee_type: 'reinscripcion' },
								{ period: { name: student_current_status.at[0] } },
								{ semester: student_current_status.at[1] },
							],
						},
					},
				],
			},
		});

		if (!details) {
		}
		return { student_info };
	}
}
