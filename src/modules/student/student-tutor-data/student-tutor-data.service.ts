import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentTutorDataDto, UpdateStudentTutorDataDto } from './dto';

@Injectable()
export class StudentTutorDataService {
	constructor(private readonly prisma: PrismaService) {}

	async getStudentTutorData(user: student) {
		const studentTutorData = await this.prisma.student_tutor_data.findUnique({
			where: { id_student: user.control_number },
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
					id_student: user.control_number,
					...createStudentTutorDataDto,
					street_number: street_number.toString(),
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

			const updatedTutorData = await this.prisma.student_tutor_data.update({
				where: { id_student: user.control_number },
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
		console.log(error);
		throw new InternalServerErrorException('Please check server logs');
	}
}
