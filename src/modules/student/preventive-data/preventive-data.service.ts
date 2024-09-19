import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePreventiveDataDto, UpdatePreventiveDataDto } from './dto';

@Injectable()
export class PreventiveDataService {
	constructor(private readonly prisma: PrismaService) {}

	async getPreventiveData(user: student) {
		const studentPreventiveData = await this.prisma.preventive_data.findUnique({
			where: { id_student: user.control_number },
		});

		if (studentPreventiveData) return studentPreventiveData;

		return {
			message: `There is no preventive data of the user ${user.control_number}`,
		};
	}
	async createPreventiveData(
		user: student,
		createPreventiveDataDto: CreatePreventiveDataDto,
	) {
		try {
			const { clinic } = createPreventiveDataDto;

			const preventiveData = await this.prisma.preventive_data.create({
				data: {
					id_student: user.control_number,
					...createPreventiveDataDto,
					clinic: clinic.toString(),
				},
			});

			return preventiveData;
		} catch (error) {
			this.handleDBErrors(error);
		}
	}
	async updatePreventiveData(
		user: student,
		updatePreventiveDataDto: UpdatePreventiveDataDto,
	) {
		try {
			const { clinic } = updatePreventiveDataDto;

			const updatedPreventiveData = await this.prisma.preventive_data.update({
				where: { id_student: user.control_number },
				data: {
					...updatePreventiveDataDto,
					clinic: clinic.toString(),
				},
			});

			return updatedPreventiveData;
		} catch (error) {
			console.log(error);
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
