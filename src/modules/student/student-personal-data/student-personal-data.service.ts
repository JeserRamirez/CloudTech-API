import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStudentPersonalDataDto } from './dto';

@Injectable()
export class StudentPersonalDataService {
	constructor(private readonly prisma: PrismaService) {}

	async getStudentPersonalData(user: student) {
		const { student_personal_data } = await this.prisma.general_data.findFirst({
			where: { student_id: user.student_id },
			select: {
				student_personal_data: true,
			},
		});

		if (!student_personal_data)
			return new NotFoundException({
				message: `There is no personal data of the user ${user.control_number}`,
			});

		return student_personal_data;
	}

	async updateStudentPersonalData(
		user: student,
		updateStudentPersonalDataDto: UpdateStudentPersonalDataDto,
	) {
		try {
			await this.prisma.student_personal_data.updateMany({
				where: { general_data: { student_id: user.student_id } },
				data: {
					...updateStudentPersonalDataDto,
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
