import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
	CreateTeacherPersonalDataDto,
	UpdateTeacherPersonalDataDto,
} from './dto';
import { teacher } from '@prisma/client';

@Injectable()
export class TeacherPersonalDataService {
	constructor(private readonly prisma: PrismaService) {}

	async getTeacherPersonalData(user: teacher) {
		const teacherPersonalData =
			await this.prisma.teacher_personal_data.findUnique({
				where: { id_teacher_number: user.teacher_number },
			});

		if (teacherPersonalData) return teacherPersonalData;

		return {
			message: `There is no personal data of the user ${user.teacher_number}`,
		};
	}

	async createTeacherPersonalData(
		user: teacher,
		createTeacherPersonalDataDto: CreateTeacherPersonalDataDto,
	) {
		try {
			const { street_number } = createTeacherPersonalDataDto;

			const personalData = await this.prisma.teacher_personal_data.create({
				data: {
					id_teacher_number: user.teacher_number,
					...createTeacherPersonalDataDto,
					street_number: street_number.toString(),
				},
			});

			return personalData;
		} catch (error) {
			this.handleDBErrors(error);
		}
	}

	async updateTeacherPersonalData(
		user: teacher,
		updateTeacherPersonalDataDto: UpdateTeacherPersonalDataDto,
	) {
		try {
			const { street_number } = updateTeacherPersonalDataDto;

			const updatedPersonalData =
				await this.prisma.teacher_personal_data.update({
					where: { id_teacher_number: user.teacher_number },
					data: {
						...updateTeacherPersonalDataDto,
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
		console.log(error);
		throw new InternalServerErrorException('Please check server logs');
	}
}
