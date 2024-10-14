import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePreventiveDataDto {
	@ApiProperty({
		description: 'NSS',
		example: '12345678910',
		required: true,
		type: 'string',
		minLength: 11,
		maxLength: 11,
	})
	@IsString()
	@MinLength(11)
	@MaxLength(11)
	id_nss: string;

	@ApiProperty({
		description: 'clinic',
		example: '32',
		required: true,
		type: 'string',
	})
	@IsString()
	clinic: string;

	@ApiProperty({
		description: 'blood type',
		example: 'O+',
		type: 'string',
		required: true,
	})
	@IsString()
	blood_type: string;

	@ApiProperty({
		description: 'allergies',
		example: 'Polen, Penicilina',
		type: 'string',
		required: true,
	})
	@IsString()
	allergies: string;

	@ApiProperty({
		description: 'disability',
		example: 'Sordera',
		type: 'string',
		required: true,
	})
	@IsString()
	disability: string;

	@ApiProperty({
		description: 'psychological problems',
		example: 'Ansiedad',
		required: true,
		type: 'string',
	})
	@IsString()
	psychological_problems: string;
}
