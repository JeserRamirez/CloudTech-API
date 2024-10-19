import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePreventiveDataDto } from './dto';
import { removeAttributes } from 'src/common/helpers';

@Injectable()
export class PreventiveDataService {
	constructor(private readonly prisma: PrismaService) {}

	async getPreventiveData(user: student) {
		const { preventive_data } = await this.prisma.general_data.findFirst({
			where: { student_id: user.student_id },
			select: {
				preventive_data: true,
			},
		});

		if (!preventive_data)
			return new NotFoundException({
				message: `There is no preventive data of the user ${user.control_number}`,
			});

		const cleanedData = removeAttributes(preventive_data, [
			'general_data_id',
			'id_preventive_data',
		]);

		return cleanedData;
	}

	async updatePreventiveData(
		user: student,
		updatePreventiveDataDto: UpdatePreventiveDataDto,
	) {
		try {
			await this.prisma.preventive_data.updateMany({
				where: { general_data: { student_id: user.student_id } },
				data: {
					...updatePreventiveDataDto,
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
