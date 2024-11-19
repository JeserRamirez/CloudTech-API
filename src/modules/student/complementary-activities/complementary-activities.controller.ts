import { Controller, Get } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { student } from '@prisma/client';
import { ComplementaryActivitiesService } from './complementary-activities.service';
import { ValidRoles } from 'src/auth/interfaces';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Complementary Activities')
@Controller('student/complementary-activities')
export class ComplementaryActivitiesController {
	constructor(
		private readonly complementaryActivitiesService: ComplementaryActivitiesService,
	) {}

	@Get()
	@ApiResponse({
		status: 200,
		content: {
			'application/json': {
				example: {
					complementary_activities: [
						{
							status: 'pendiente',
							complementary_activity: {
								activity_name: 'Tutorias 1',
								period: 'ENEJUN2024',
								credits: 1,
								teacher: {
									teacher_personal_data: {
										firstname: 'Jeser',
										lastname: 'Ramirez Estrada',
									},
								},
							},
						},
						{
							status: 'completado',
							complementary_activity: {
								activity_name: 'Tutorias 2',
								period: 'AGODIC2024',
								credits: 1,
								teacher: {
									teacher_personal_data: {
										firstname: 'Jeser',
										lastname: 'Ramirez Estrada',
									},
								},
							},
						},
						{
							status: 'completado',
							complementary_activity: {
								activity_name: 'Extraescolares',
								period: 'ENEJUN2024',
								credits: 2,
								teacher: {
									teacher_personal_data: {
										firstname: 'Jeser',
										lastname: 'Ramirez Estrada',
									},
								},
							},
						},
						{
							status: 'completado',
							complementary_activity: {
								activity_name: 'Curso Power Bi',
								period: 'AGODIC2024',
								credits: 1,
								teacher: {
									teacher_personal_data: {
										firstname: 'Jeser',
										lastname: 'Ramirez Estrada',
									},
								},
							},
						},
						{
							status: 'pendiente',
							complementary_activity: {
								activity_name: 'Curso Excel',
								period: 'ENEJUN2025',
								credits: 2,
								teacher: {
									teacher_personal_data: {
										firstname: 'Jeser',
										lastname: 'Ramirez Estrada',
									},
								},
							},
						},
					],
					totalCredits: 4,
				},
			},
		},
	})
	@Auth(ValidRoles.student)
	async getAllComplementaryActivities(@GetUser() user: student) {
		return this.complementaryActivitiesService.getAllComplementaryActivities(
			user,
		);
	}
}
