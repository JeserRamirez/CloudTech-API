import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePreApplicationRequestDto {
	@ApiProperty({
		description: 'Applicant career option',
		type: 'string',
		required: true,
	})
	@IsString()
	career: string;

	@ApiProperty({
		description: 'Career modality option',
		type: 'string',
		required: true,
	})
	@IsString()
	career_model: string;
}
