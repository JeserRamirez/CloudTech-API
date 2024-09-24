import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentTutorDataDto, UpdateStudentTutorDataDto } from './dto';

@Injectable()
export class StudentTutorDataService {
	constructor(private readonly prisma: PrismaService) {}

	async getStudentTutorData(user: student) {
		const studentTutorData = await this.prisma.student_tutor_data.findFirst({
			where: { studentId: user.control_number },
		});

		if (studentTutorData) return studentTutorData;

		return {
			message: `There is no tutor data of the user ${user.control_number}`,
		};
	}

	async createStudentTutorData(
		user: student,
		createStudentTutorDataDto: CreateStudentTutorDataDto,
	) {
		try {
			const { street_number } = createStudentTutorDataDto;

			const tutorData = await this.prisma.student_tutor_data.create({
				data: {
					...createStudentTutorDataDto,
					street_number: street_number.toString(),
					student: {
						connect: {
							control_number: user.control_number,
						},
					},
				},
			});

			return tutorData;
		} catch (error) {
			this.handleDBErrors(error);
		}
	}

	async updateStudentTutorData(
		user: student,
		updateStudentTutorDataDto: UpdateStudentTutorDataDto,
	) {
		try {
			const { street_number } = updateStudentTutorDataDto;

			const updatedTutorData = await this.prisma.student_tutor_data.updateMany({
				where: { studentId: user.control_number },
				data: {
					...updateStudentTutorDataDto,
					street_number: street_number.toString(),
				},
			});

			return updatedTutorData;
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
