import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { applicant } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePreventiveDataDto } from './dto';
import { removeAttributes } from 'src/common/helpers';

@Injectable()
export class PreventiveDataService {
	constructor(private readonly prisma: PrismaService) {}

	async getPreventiveData(user: applicant) {
		const { preventive_data } = await this.prisma.general_data.findFirst({
			where: { applicant_id: user.applicant_id },
			select: {
				preventive_data: true,
			},
		});

		if (!preventive_data)
			return new NotFoundException({
				message: `There is no preventive data of the user ${user.curp}`,
			});

		const cleanedData = removeAttributes(preventive_data[0], [
			'general_data_id',
			'id_preventive_data',
		]);

		return cleanedData;
	}

	async updatePreventiveData(
		user: applicant,
		updatePreventiveDataDto: UpdatePreventiveDataDto,
	) {
		try {
			await this.prisma.preventive_data.updateMany({
				where: { general_data: { applicant_id: user.applicant_id } },
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
