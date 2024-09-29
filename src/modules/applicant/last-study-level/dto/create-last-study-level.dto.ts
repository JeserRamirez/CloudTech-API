import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLastStudyLevelDto {
	@ApiProperty({
		description: 'Name of the last school',
		required: true,
		type: 'string',
		example: 'Escuela Superior de Ingeniería y Tecnología',
	})
	@IsString()
	provenance_school_name: string;

	@ApiProperty({
		description: 'State of the last school',
		required: true,
		type: 'string',
		example: 'Veracruz',
	})
	@IsString()
	provenance_state: string;

	@ApiProperty({
		description: 'City of the last school',
		required: true,
		type: 'string',
		example: 'Minatitlan',
	})
	@IsString()
	provenence_city: string;

	@ApiProperty({
		description: 'Graduation Date',
		required: true,
		type: 'string',
		format: 'date',
		example: '2022-01-01',
	})
	@IsDate()
	@Type(() => Date)
	graduation_date: Date;

	@ApiProperty({
		description: 'Score obtained in the last school',
		required: true,
		type: 'string',
		example: '90',
		minLength: 2,
		maxLength: 2,
	})
	@IsString()
	@MinLength(2)
	@MaxLength(2)
	graduation_score: string;

	@ApiProperty({
		description: 'Area of study in the last school',
		required: true,
		type: 'string',
		example: 'Ofimatica',
	})
	@IsString()
	area: string;
}
