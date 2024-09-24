import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
	CreateStudentPersonalDataDto,
	UpdateStudentPersonalDataDto,
} from './dto';

@Injectable()
export class StudentPersonalDataService {
	constructor(private readonly prisma: PrismaService) {}

	async getStudentPersonalData(user: student) {
		const studentPersonalData =
			await this.prisma.student_personal_data.findFirst({
				where: { studentId: user.control_number },
			});

		if (studentPersonalData) return studentPersonalData;

		return {
			message: `There is no personal data of the user ${user.control_number}`,
		};
	}

	async createStudentPersonalData(
		user: student,
		createStudentPersonalDataDto: CreateStudentPersonalDataDto,
	) {
		try {
			const { street_number } = createStudentPersonalDataDto;

			const personalData = await this.prisma.student_personal_data.create({
				data: {
					...createStudentPersonalDataDto,
					street_number: street_number.toString(),
					student: {
						connect: { control_number: user.control_number },
					},
				},
			});

			return personalData;
		} catch (error) {
			this.handleDBErrors(error);
		}
	}

	async updateStudentPersonalData(
		user: student,
		updateStudentPersonalDataDto: UpdateStudentPersonalDataDto,
	) {
		try {
			const { street_number } = updateStudentPersonalDataDto;

			const updatedPersonalData =
				await this.prisma.student_personal_data.updateMany({
					where: { studentId: user.control_number },
					data: {
						...updateStudentPersonalDataDto,
						street_number: street_number.toString(),
					},
				});

			return updatedPersonalData;
		} catch (error) {
			this.handleDBErrors(error);
		}
	}

	private handleDBErrors(error: any): never {
		if (error.code == 'P2002')
			throw new BadRequestException(
				'There already exists a record with that userId',
			);

		if (error.code == 'P2025') {
			throw new NotFoundException('There is no record with that userId');
		}

		console.log(error);
		throw new InternalServerErrorException('Please check server logs');
	}
}
