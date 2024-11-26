import { Controller, Get } from '@nestjs/common';
import { PaymentOfServicesService } from './payment-of-services.service';
import { student } from '@prisma/client';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment Of Services')
@Controller('student/payment-of-services')
export class PaymentOfServicesController {
	constructor(
		private readonly paymentOfServicesService: PaymentOfServicesService,
	) {}

	@Get('payment-information')
	@ApiResponse({
		status: 200,
		content: {
			'application/json': {
				example: {
					enrollment_id: 2,
					enrollment_date: '2024-11-27T15:00:00.000Z',
					student_id: 19,
					id_reinscription_date: 1,
				},
			},
		},
	})
	@Auth(ValidRoles.student)
	async getPaymentInformation(@GetUser() user: student) {
		return await this.paymentOfServicesService.getPaymentInformation(user);
	}

	@Get('payment-details')
	@ApiResponse({
		status: 200,
		content: {
			'application/json': {
				example: {
					details: {
						id_student_reinscription: 1,
						reinscription_token: '0000001',
						reinscription_request_date: '2024-11-24T02:43:06.237Z',
						validation_date: null,
						authorization: null,
						payment_status: true,
						student_id: 19,
						fees_id: 3,
					},
				},
			},
		},
	})
	@Auth(ValidRoles.student)
	async getPaymentDetails(@GetUser() user: student) {
		return await this.paymentOfServicesService.getPaymentDetails(user);
	}
}
