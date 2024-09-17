import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateStudentPersonalDataDto {
	@ApiProperty({
		description: 'Student Firstname',
		example: 'Pepe',
		required: true,
		type: 'string',
	})
	@IsString()
	firstname: string;

	@ApiProperty({
		description: 'Student Lastname',
		example: 'Martinez Gonzales',
		required: true,
		type: 'string',
	})
	@IsString()
	lastname: string;

	@ApiProperty({
		description: 'Street Name',
		example: 'Calle 123',
		required: false,
		type: 'string',
	})
	@IsString()
	@IsOptional()
	street_name?: string;

	@ApiProperty({
		description: 'Street Number',
		example: '123',
		required: false,
		type: 'number',
	})
	@IsNumber()
	@IsOptional()
	street_number?: number;

	@ApiProperty({
		description: 'City',
		example: 'Minatitlan',
		required: false,
		type: 'string',
	})
	@IsString()
	@IsOptional()
	city?: string;

	@ApiProperty({
		description: 'CP (5 digits)',
		example: '92500',
		required: false,
		type: 'string',
		minLength: 5,
		maxLength: 5,
	})
	@IsString()
	@MinLength(5)
	@MaxLength(5)
	@IsOptional()
	cp?: string;

	@ApiProperty({
		description: 'Personal Email',
		example: 'pepe.martinez@gmail.com',
		required: true,
		type: 'string',
		format: 'email',
	})
	@IsEmail()
	personal_email: string;

	@ApiProperty({
		description: 'Schoolar Email',
		example: 'pepe.margo@minatitlan.tecnm.mx',
		required: true,
		type: 'string',
		format: 'email',
	})
	@IsEmail()
	schoolar_email: string;
}
