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

@Controller('pre-application')
export class PreApplicationController {
	constructor(private readonly preApplicationService: PreApplicationService) {}

	@Get('careers')
	@Auth(ValidRoles.applicant)
	async getCareers() {
		return this.preApplicationService.getAllCareers();
	}

	@Get('')
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
	@Auth(ValidRoles.applicant)
	async updateTotalAmount(@GetUser() user: applicant) {
		return await this.preApplicationService.updateTotalAmount(user);
	}

	@Patch('init_pre-application-token')
	@Auth(ValidRoles.applicant)
	async createPreApplicationToken(@GetUser() user: applicant) {
		return await this.preApplicationService.assignPreApplicationToken(user);
	}

	@Get('token')
	@Auth(ValidRoles.applicant)
	async getPreApplicationToken(@GetUser() user: applicant) {
		return this.preApplicationService.getPreApplicationToken(user);
	}
}
