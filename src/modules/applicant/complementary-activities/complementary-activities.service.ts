import { Injectable, NotFoundException } from '@nestjs/common';
import { student } from '@prisma/client';
import { removeAttributes } from 'src/common/helpers';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComplementaryActivitiesService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllComplementaryActivities(user: student) {
		try {
			const complementary_activities =
				await this.prisma.student_complementary_activities.findMany({
					where: { student_id: user.student_id },
					include: {
						complementary_activity: {
							include: {
								teacher: {
									select: {
										teacher_personal_data: {
											select: { firstname: true, lastname: true },
										},
									},
								},
							},
						},
					},
				});

			if (complementary_activities.length === 0) {
				throw new NotFoundException(
					'No complementary activities found for this student.',
				);
			}

			const totalCredits = complementary_activities
				.filter((activity) => activity.status === 'completado')
				.reduce(
					(acc, activity) =>
						acc + (activity.complementary_activity?.credits || 0),
					0,
				);

			const cleanedData = removeAttributes(complementary_activities, [
				'id_activity',
				'student_id',
				'complementary_activity_id',
				'id_complementary',
				'assigned_teacher',
			]);

			return {
				complementary_activities: cleanedData,
				totalCredits,
			};
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
		}
	}
}
