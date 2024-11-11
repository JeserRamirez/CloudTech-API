import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePreApplicationRequestDto {
	@ApiProperty({
		description: 'Applicant career option',
		example: 'ingenieria industrial',
		type: 'string',
		required: true,
	})
	@IsString()
	career: string;

	@ApiProperty({
		description: 'Career modality option',
		example: 'escolarizado',
		type: 'string',
		required: true,
	})
	@IsString()
	career_model: string;
}
