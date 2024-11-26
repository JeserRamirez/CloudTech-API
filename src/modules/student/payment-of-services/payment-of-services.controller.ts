import { Controller, Get } from '@nestjs/common';
import { PaymentOfServicesService } from './payment-of-services.service';
import { student } from '@prisma/client';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('student/payment-of-services')
export class PaymentOfServicesController {
	constructor(
		private readonly paymentOfServicesService: PaymentOfServicesService,
	) {}

	@Get('payment-information')
	@Auth(ValidRoles.student)
	async getPaymentInformation(@GetUser() user: student) {
		return await this.paymentOfServicesService.getPaymentInformation(user);
	}

	@Get('payment-details')
	@Auth(ValidRoles.student)
	async getPaymentDetails(@GetUser() user: student) {
		return await this.paymentOfServicesService.getPaymentDetails(user);
	}
}
