import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateLastStudyLevelDto } from './dto';
import { removeAttributes } from 'src/common/helpers';

@Injectable()
export class LastStudyLevelService {
	constructor(private readonly prisma: PrismaService) {}

	async getLastStudyLevel(user: student) {
		const { last_study_Level } = await this.prisma.general_data.findFirst({
			where: { student_id: user.student_id },
			select: {
				last_study_Level: true,
			},
		});

		if (!last_study_Level)
			return new NotFoundException({
				message: `There is no last study level data of the user ${user.control_number}`,
			});

		const cleanedData = removeAttributes(last_study_Level[0], [
			'general_data_id',
			'id_last_study_Level',
		]);

		return cleanedData;
	}

	async updateLastStudyLevel(
		user: student,
		updateLastStudyLevelDto: UpdateLastStudyLevelDto,
	) {
		try {
			await this.prisma.last_study_Level.updateMany({
				where: { general_data: { student_id: user.student_id } },
				data: {
					...updateLastStudyLevelDto,
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
