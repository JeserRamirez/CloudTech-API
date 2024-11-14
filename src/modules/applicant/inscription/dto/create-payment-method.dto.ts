import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateInscriptionPaymentMethodDto {
	@ApiProperty({
		description: 'Payment method',
		type: 'string',
		required: false,
	})
	@IsString()
	payment_method: string;

	@ApiProperty({
		description: 'Reference number',
		type: 'string',
		required: false,
	})
	@IsString()
	reference_number: string;
}
