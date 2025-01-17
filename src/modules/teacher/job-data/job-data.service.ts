import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { teacher } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDataDto, UpdateJobDataDto } from './dto';
import { removeAttributes } from 'src/common/helpers';

@Injectable()
export class JobDataService {
	constructor(private readonly prisma: PrismaService) {}

	async getJobData(user: teacher) {
		const jobData = await this.prisma.job_data.findUnique({
			where: { id_teacher_number: user.teacher_number },
		});

		if (!jobData)
			return {
				message: `There is no job data of the user ${user.teacher_number}`,
			};

		const cleanedData = removeAttributes(jobData, [
			'id_teacher_number',
			'id_job_data',
		]);

		return cleanedData;
	}

	async createJobData(user: teacher, createJobDataDto: CreateJobDataDto) {
		try {
			const jobData = await this.prisma.job_data.create({
				data: {
					id_teacher_number: user.teacher_number,
					...createJobDataDto,
				},
			});

			return jobData;
		} catch (error) {
			this.handleDBErrors(error);
		}
	}

	async updateJobData(user: teacher, updateJobDataDto: UpdateJobDataDto) {
		try {
			const updatedJobData = await this.prisma.job_data.update({
				where: {
					id_teacher_number: user.teacher_number,
				},
				data: {
					...updateJobDataDto,
				},
			});

			return updatedJobData;
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
