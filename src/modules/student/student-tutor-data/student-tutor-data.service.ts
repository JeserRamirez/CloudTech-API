import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStudentTutorDataDto } from './dto';
import { removeAttributes } from 'src/common/helpers';

@Injectable()
export class StudentTutorDataService {
	constructor(private readonly prisma: PrismaService) {}

	async getStudentTutorData(user: student) {
		const { student_tutor_data } = await this.prisma.general_data.findFirst({
			where: { student_id: user.student_id },
			select: {
				student_tutor_data: true,
			},
		});

		if (!student_tutor_data)
			return new NotFoundException({
				message: `There is no tutor data of the user ${user.control_number}`,
			});

		const cleanedData = removeAttributes(student_tutor_data, [
			'general_data_id',
			'id_student_tutor_data',
		]);

		return cleanedData;
	}

	async updateStudentTutorData(
		user: student,
		updateStudentTutorDataDto: UpdateStudentTutorDataDto,
	) {
		try {
			await this.prisma.student_tutor_data.updateMany({
				where: { general_data: { student_id: user.student_id } },
				data: {
					...updateStudentTutorDataDto,
				},
			});

			return { message: 'Data updated successfully' };
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
