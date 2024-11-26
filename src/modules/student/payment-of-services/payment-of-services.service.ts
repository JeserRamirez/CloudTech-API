import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { student } from '@prisma/client';

interface ReinscriptionDate {
	start_date: Date;
	deadline: Date;
}

@Injectable()
export class PaymentOfServicesService {
	constructor(private readonly prisma: PrismaService) {}

	async getPaymentInformation(user: student) {
		const student_enrollment = await this.prisma.student_enrollment.findFirst({
			where: { student_id: user.student_id },
		});

		if (student_enrollment) {
			return student_enrollment;
		}

		const reinscription_date = await this.getReinscriptionDate(user);

		const { current_period, semester } =
			await this.getStudentCurrentStatus(user);

		const details = await this.prisma.student_payment_reinscription.findFirst({
			where: {
				AND: [
					{ student_id: user.student_id },
					{
						fees: {
							AND: [
								{ fee_type: 'reinscripcion' },
								{ period: { name: current_period } },
								{ semester: semester.toString() },
							],
						},
					},
				],
			},
			select: { payment_status: true },
		});

		if (!details) {
			throw new NotFoundException('Solicitud de reinscriptcion no encontrada');
		}

		if (details.payment_status === false) {
			throw new BadRequestException(
				'No se puede generar una fecha de reinscripcion ya que el pago no ha sido validado',
			);
		}

		const enrollment = await this.prisma.student_enrollment.create({
			data: {
				enrollment_date: reinscription_date.student_reinscription_date,
				student: {
					connect: {
						student_id: user.student_id,
					},
				},
				reinscription_date: {
					connect: {
						id_reinscription_date:
							reinscription_date.reinscription_date.id_reinscription_date,
					},
				},
			},
		});

		return enrollment;
	}

	async getPaymentDetails(user: student) {
		const { current_period, semester } =
			await this.getStudentCurrentStatus(user);

		const details = await this.prisma.student_payment_reinscription.findFirst({
			where: {
				AND: [
					{ student_id: user.student_id },
					{
						fees: {
							AND: [
								{ fee_type: 'reinscripcion' },
								{ period: { name: current_period } },
								{ semester: semester.toString() },
							],
						},
					},
				],
			},
		});

		if (!details) {
			throw new NotFoundException('Solicitud de reinscriptcion no encontrada');
		}

		return { details };
	}

	private async getStudentCurrentStatus(user: student) {
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
						select: { semester: true, general_average: true },
					},
				},
			})
			.then((data) => {
				return {
					current_period:
						data?.general_data[0]?.scholar_data[0]?.current_period,
					semester: data?.student_current_status[0]?.semester,
					general_average: data?.student_current_status[0]?.general_average,
				};
			});

		return student_current_status;
	}

	private async getReinscriptionDate(user: student) {
		const { current_period, general_average } =
			await this.getStudentCurrentStatus(user);

		const reinscription_date = await this.prisma.reinscription_date.findFirst({
			where: { period: { name: current_period } },
		});

		if (!reinscription_date) {
			throw new NotFoundException(
				'No se han encontrado fechas de reinscripción',
			);
		}

		return {
			student_reinscription_date: this.setReinscriptionDate(
				Number(general_average),
				reinscription_date,
			),
			reinscription_date,
		};
	}

	private setReinscriptionDate(
		general_average: number,
		reinscription_date: ReinscriptionDate,
	) {
		const startDate = new Date(reinscription_date.start_date);
		const endDate = new Date(reinscription_date.deadline);

		const reinscriptionDays = {
			high: {
				start: new Date(startDate).setUTCHours(8, 0, 0, 0),
				end: new Date(startDate).setUTCHours(17, 0, 0, 0),
			},
			medium: {
				start: new Date(
					new Date(startDate).setUTCDate(startDate.getUTCDate() + 1),
				).setUTCHours(8, 0, 0, 0),
				end: new Date(
					new Date(startDate).setUTCDate(startDate.getUTCDate() + 1),
				).setUTCHours(17, 0, 0, 0),
			},
			low: {
				start: new Date(endDate).setUTCHours(8, 0, 0, 0),
				end: new Date(endDate).setUTCHours(17, 0, 0, 0),
			},
		};

		let final_reinscription_date: Date;

		// High grades
		if (general_average === 100 || general_average >= 99) {
			final_reinscription_date = new Date(reinscriptionDays.high.start);
		} else if (general_average >= 98 && general_average < 99) {
			final_reinscription_date = new Date(reinscriptionDays.high.start);
			final_reinscription_date.setUTCHours(9, 0, 0, 0);
		} else if (general_average >= 97 && general_average < 98) {
			final_reinscription_date = new Date(reinscriptionDays.high.start);
			final_reinscription_date.setUTCHours(10, 0, 0, 0);
		} else if (general_average >= 96 && general_average < 97) {
			final_reinscription_date = new Date(reinscriptionDays.high.start);
			final_reinscription_date.setUTCHours(11, 0, 0, 0);
		} else if (general_average >= 95 && general_average < 96) {
			final_reinscription_date = new Date(reinscriptionDays.high.start);
			final_reinscription_date.setUTCHours(12, 0, 0, 0);
		} else if (general_average >= 94 && general_average < 95) {
			final_reinscription_date = new Date(reinscriptionDays.high.start);
			final_reinscription_date.setUTCHours(13, 0, 0, 0);
		} else if (general_average >= 93 && general_average < 94) {
			final_reinscription_date = new Date(reinscriptionDays.high.start);
			final_reinscription_date.setUTCHours(14, 0, 0, 0);
		} else if (general_average >= 92 && general_average < 93) {
			final_reinscription_date = new Date(reinscriptionDays.high.start);
			final_reinscription_date.setUTCHours(15, 0, 0, 0);
		} else if (general_average >= 91 && general_average < 92) {
			final_reinscription_date = new Date(reinscriptionDays.high.start);
			final_reinscription_date.setUTCHours(16, 0, 0, 0);
		} else if (general_average >= 90 && general_average < 91) {
			final_reinscription_date = new Date(reinscriptionDays.high.end);
		}

		// Medium grades
		if (general_average === 89.9 && general_average >= 89) {
			final_reinscription_date = new Date(reinscriptionDays.medium.start);
		} else if (general_average >= 88 && general_average < 89) {
			final_reinscription_date = new Date(reinscriptionDays.medium.start);
			final_reinscription_date.setUTCHours(9, 0, 0, 0);
		} else if (general_average >= 87 && general_average < 88) {
			final_reinscription_date = new Date(reinscriptionDays.medium.start);
			final_reinscription_date.setUTCHours(10, 0, 0, 0);
		} else if (general_average >= 86 && general_average < 87) {
			final_reinscription_date = new Date(reinscriptionDays.medium.start);
			final_reinscription_date.setUTCHours(11, 0, 0, 0);
		} else if (general_average >= 85 && general_average < 86) {
			final_reinscription_date = new Date(reinscriptionDays.medium.start);
			final_reinscription_date.setUTCHours(12, 0, 0, 0);
		} else if (general_average >= 84 && general_average < 85) {
			final_reinscription_date = new Date(reinscriptionDays.medium.start);
			final_reinscription_date.setUTCHours(13, 0, 0, 0);
		} else if (general_average >= 83 && general_average < 84) {
			final_reinscription_date = new Date(reinscriptionDays.medium.start);
			final_reinscription_date.setUTCHours(14, 0, 0, 0);
		} else if (general_average >= 82 && general_average < 83) {
			final_reinscription_date = new Date(reinscriptionDays.medium.start);
			final_reinscription_date.setUTCHours(15, 0, 0, 0);
		} else if (general_average >= 81 && general_average < 82) {
			final_reinscription_date = new Date(reinscriptionDays.medium.start);
			final_reinscription_date.setUTCHours(16, 0, 0, 0);
		} else if (general_average >= 80 && general_average < 81) {
			final_reinscription_date = new Date(reinscriptionDays.medium.end);
		}

		// Low grades
		if (general_average === 79.9 && general_average >= 79) {
			final_reinscription_date = new Date(reinscriptionDays.low.start);
		} else if (general_average >= 78 && general_average < 79) {
			final_reinscription_date = new Date(reinscriptionDays.low.start);
			final_reinscription_date.setUTCHours(9, 0, 0, 0);
		} else if (general_average >= 77 && general_average < 78) {
			final_reinscription_date = new Date(reinscriptionDays.low.start);
			final_reinscription_date.setUTCHours(10, 0, 0, 0);
		} else if (general_average >= 76 && general_average < 77) {
			final_reinscription_date = new Date(reinscriptionDays.low.start);
			final_reinscription_date.setUTCHours(11, 0, 0, 0);
		} else if (general_average >= 75 && general_average < 76) {
			final_reinscription_date = new Date(reinscriptionDays.low.start);
			final_reinscription_date.setUTCHours(12, 0, 0, 0);
		} else if (general_average >= 74 && general_average < 75) {
			final_reinscription_date = new Date(reinscriptionDays.low.start);
			final_reinscription_date.setUTCHours(13, 0, 0, 0);
		} else if (general_average >= 73 && general_average < 74) {
			final_reinscription_date = new Date(reinscriptionDays.low.start);
			final_reinscription_date.setUTCHours(14, 0, 0, 0);
		} else if (general_average >= 72 && general_average < 73) {
			final_reinscription_date = new Date(reinscriptionDays.low.start);
			final_reinscription_date.setUTCHours(15, 0, 0, 0);
		} else if (general_average >= 71 && general_average < 72) {
			final_reinscription_date = new Date(reinscriptionDays.low.start);
			final_reinscription_date.setUTCHours(16, 0, 0, 0);
		} else if (general_average >= 70 && general_average < 71) {
			final_reinscription_date = new Date(reinscriptionDays.low.end);
		}

		if (!final_reinscription_date) {
			throw new ConflictException(
				`No puede ser generada una fecha de reinscripcion porque tu promedio general es de ${general_average}`,
			);
		}

		return final_reinscription_date;
	}
}
