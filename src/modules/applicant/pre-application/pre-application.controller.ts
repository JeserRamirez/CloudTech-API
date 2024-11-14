import { Body, Controller, Get, Patch, Post, UsePipes } from '@nestjs/common';
import { PreApplicationService } from './pre-application.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { applicant } from '@prisma/client';
import {
	CreatePreApplicationRequestDto,
	UpdatePaymentMethodDto,
	UpdatePreApplicationRequestDto,
} from './dto';
import { TrimPipe } from 'src/common/pipes';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Applicant Pre-pplication')
@Controller('applicant/pre-application')
export class PreApplicationController {
	constructor(private readonly preApplicationService: PreApplicationService) {}

	@Get('careers')
	@ApiResponse({
		status: 200,
		content: {
			'application/json': {
				example: [
					{
						id_carrer: 1,
						carrer_name: 'ingenieria en sistemas computacionales',
						modality: 'escolarizado',
					},
					{
						id_carrer: 2,
						carrer_name: 'ingenieria quimica',
						modality: 'escolarizado',
					},
					{
						id_carrer: 3,
						carrer_name: 'ingenieria electronica',
						modality: 'escolarizado',
					},
					{
						id_carrer: 5,
						carrer_name: 'ingenieria industrial',
						modality: 'escolarizado',
					},
					{
						id_carrer: 4,
						carrer_name: 'ingenieria industrial',
						modality: 'a distancia',
					},
				],
			},
		},
	})
	@Auth(ValidRoles.applicant)
	async getCareers() {
		return this.preApplicationService.getAllCareers();
	}

	@Get()
	@ApiResponse({
		status: 200,
		content: {
			'application/json': {
				example: {
					folio: '0001',
					career: 'Ingenieria en Sistemas Computacionales',
					career_model: 'escolarizado',
					pre_application_request_date: '2024-11-11T04:21:01.977Z',
					state: 'pendiente',
					total_amount_to_pay: '2470',
					payment_method: '',
					reference_number: '',
					fees: {
						amount: '2600',
						discount: '5',
						deadline: '2024-11-30T00:00:00.000Z',
					},
				},
			},
		},
	})
	@Auth(ValidRoles.applicant)
	async getPreApplication(@GetUser() user: applicant) {
		return this.preApplicationService.getPreApplication(user);
	}

	@Post('request')
	@Auth(ValidRoles.applicant)
	@UsePipes(new TrimPipe())
	async createPreApplication(
		@GetUser() user: applicant,
		@Body() createPreApplicationRequestDto: CreatePreApplicationRequestDto,
	) {
		return this.preApplicationService.createPreApplication(
			user,
			createPreApplicationRequestDto,
		);
	}

	@Patch('request')
	@ApiBody({
		description: 'Datos para actualizar la carrera',
		schema: {
			example: {
				career: 'Ingenieria en Electronica',
				career_model: 'escolarizado',
			},
		},
	})
	@Auth(ValidRoles.applicant)
	async updatePreApplicationRequest(
		@GetUser() user: applicant,
		@Body() updatePreApplicationRequestDto: UpdatePreApplicationRequestDto,
	) {
		return await this.preApplicationService.updatePreApplication(
			user,
			updatePreApplicationRequestDto,
		);
	}

	@Patch('payment-method')
	@ApiBody({
		description: 'Datos para actualizar la carrera',
		schema: {
			example: {
				payment_method: 'SPEI',
				reference_number: '9834 5672 9854 2146',
			},
		},
	})
	@Auth(ValidRoles.applicant)
	@UsePipes(new TrimPipe())
	async updatePaymentMethod(
		@GetUser() user: applicant,
		@Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
	) {
		return await this.preApplicationService.updatePaymentMethod(
			user,
			updatePaymentMethodDto,
		);
	}

	@Patch('init_status-change')
	@ApiOperation({
		summary: 'Actualizar el status a completado y el total a pagar.',
		description:
			'Esta ruta esta pensada para usarse al renderizar el componente por primera vez, valida si el status ha sido cambiado a true en la base de datos.',
	})
	@Auth(ValidRoles.applicant)
	async updateTotalAmount(@GetUser() user: applicant) {
		return await this.preApplicationService.updateTotalAmount(user);
	}

	@Patch('init_pre-application-token')
	@ApiOperation({
		summary: 'Asignar la ficha de inscripcion y la fecha de examen (ficticio).',
		description:
			'Esta ruta esta pensada para usarse al renderizar el componente por primera vez, asigna la ficha si el status ya ha cambiado a completado.',
	})
	@Auth(ValidRoles.applicant)
	async createPreApplicationToken(@GetUser() user: applicant) {
		return await this.preApplicationService.assignPreApplicationToken(user);
	}

	@Get('token')
	@ApiResponse({
		status: 200,
		content: {
			'application/json': {
				example: {
					pre_application_token: '0001',
					career: 'Ingenieria en Sistemas Computacionales',
					career_model: 'escolarizado',
					examn_applicant: [
						{
							exam_date: '2024-11-11T04:35:22.151Z',
						},
					],
				},
			},
		},
	})
	@Auth(ValidRoles.applicant)
	async getPreApplicationToken(@GetUser() user: applicant) {
		return this.preApplicationService.getPreApplicationToken(user);
	}
}
