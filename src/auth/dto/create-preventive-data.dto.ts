import { ApiProperty } from '@nestjs/swagger';
import {
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreatePreventiveDataDto {
	@ApiProperty({
		description: 'NSS',
		required: true,
		nullable: false,
		type: 'string',
		minLength: 1,
	})
	@IsString()
	@MinLength(11)
	@MaxLength(11)
	id_nss: string;

	@ApiProperty({
		description: 'clinic',
		required: true,
		type: 'number',
		nullable: false,
	})
	@IsNumber()
	clinic: number;

	@ApiProperty({
		description: 'blood type',
		type: 'string',
		required: false,
		nullable: true,
	})
	@IsString()
	@IsOptional()
	blood_type?: string;

	@ApiProperty({
		description: 'allergies',
		type: 'string',
		required: false,
		nullable: true,
	})
	@IsString()
	@IsOptional()
	allergies?: string;

	@ApiProperty({
		description: 'disability',
		type: 'string',
		required: false,
		nullable: true,
	})
	@IsString()
	@IsOptional()
	disability?: string;

	@ApiProperty({
		description: 'psychological problems',
		nullable: true,
		required: false,
		type: 'string',
		minLength: 1,
	})
	@IsString()
	@IsOptional()
	psychological_problems?: string;
}
