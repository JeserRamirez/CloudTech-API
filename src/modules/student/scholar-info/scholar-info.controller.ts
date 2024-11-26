import { Controller, Get } from '@nestjs/common';
import { ScholarInfoService } from './scholar-info.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { student } from '@prisma/client';
import { ValidRoles } from 'src/auth/interfaces';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Student Scholar Information')
@Controller('student/scholar-info')
export class ScholarInfoController {
	constructor(private readonly scholarInfoService: ScholarInfoService) {}

	@Get()
	@ApiResponse({
		status: 200,
		content: {
			'application/json': {
				example: {
					student: {
						control_number: '20230239',
					},
					student_personal_data: [
						{
							firstname: 'Jeser',
							lastname: 'Ramirez Estrada',
							curp: 'RAEJ020717HVZMSSA2',
						},
					],
					student_kardex_plan: [
						{
							study_plan: {
								name: 'ISC-2010',
								carrer: {
									carrer_name: 'ingenieria en sistemas computacionales',
									student_current_status: [
										{
											semester: 2,
										},
									],
								},
							},
						},
					],
				},
			},
		},
	})
	@Auth(ValidRoles.student)
	async getScholarInfo(@GetUser() user: student) {
		return this.scholarInfoService.getStudentInfo(user);
	}
}
