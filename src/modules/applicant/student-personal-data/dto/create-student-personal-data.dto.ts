import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsEmail,
	IsOptional,
	IsPhoneNumber,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateStudentPersonalDataDto {
	@ApiProperty({
		description: 'Applicant Firstname',
		example: 'Pepe',
		required: true,
		type: 'string',
	})
	@IsString()
	firstname: string;

	@ApiProperty({
		description: 'Applicant Lastname',
		example: 'Martinez Gonzales',
		required: true,
		type: 'string',
	})
	@IsString()
	lastname: string;

	@ApiProperty({
		description: 'Fecha de nacimiento',
		example: '2022-01-01',
		required: true,
		type: 'date',
		format: 'date',
	})
	@IsDate()
	@Type(() => Date)
	birthdate: Date;

	@ApiProperty({
		description: 'CURP of the applicant',
		type: 'string',
		example: 'LAEJ020515MVZMSSA2',
		minLength: 18,
		maxLength: 18,
	})
	@IsString()
	@MinLength(18)
	@MaxLength(18)
	@Matches(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]{2}$/, {
		message: 'The CURP does not have a valid format',
	})
	curp: string;

	@ApiProperty({
		description: 'Street Name',
		example: 'Calle 123',
		required: true,
		type: 'string',
	})
	@IsString()
	street_name: string;

	@ApiProperty({
		description: 'Street Number',
		example: 'S/N or 123',
		required: true,
		type: 'string',
	})
	@IsString()
	street_number: string;

	@ApiProperty({
		description: 'State of Birth',
		example: 'San Francisco',
		required: true,
		type: 'string',
	})
	@IsString()
	state_of_birth: string;

	@ApiProperty({
		description: 'State of residence',
		example: 'San Francisco',
		required: true,
		type: 'string',
	})
	@IsString()
	state: string;

	@ApiProperty({
		description: 'Municipality of birth',
		example: 'San Francisco',
		required: true,
		type: 'string',
	})
	@IsString()
	municipality_of_birth: string;

	@ApiProperty({
		description: 'Home phone number of the applicant',
		example: '+54 9123456789',
		type: 'string',
		required: true,
	})
	@IsPhoneNumber()
	home_phone: string;

	@ApiProperty({
		description: 'Phone number of the applicant',
		example: '+54 9123456789',
		type: 'string',
		required: true,
	})
	@IsPhoneNumber()
	mobile_phone: string;

	@ApiProperty({
		description: 'Neighborhood',
		example: 'Fishermans Warf',
		required: true,
		type: 'string',
	})
	@IsString()
	neighborhood: string;

	@ApiProperty({
		description: 'Company name',
		example: 'Google',
		required: false,
		type: 'string',
	})
	@IsOptional()
	@IsString()
	company?: string;

	@ApiProperty({
		description: 'CP (5 digits)',
		example: '92500',
		required: true,
		type: 'string',
		minLength: 5,
		maxLength: 5,
	})
	@IsString()
	@MinLength(5)
	@MaxLength(5)
	cp: string;

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
		description: 'Civil Status of Applicant',
		example: 'SOLTERO',
		required: true,
		type: 'string',
	})
	@IsString()
	civil_status: string;

	@ApiProperty({
		description: 'Laboral Status of Applicant',
		example: 'DESEMPLEADO',
		required: true,
		type: 'string',
	})
	@IsString()
	laboral_status: string;

	@ApiProperty({
		description: 'RFC',
		example: 'PMG920101ABC01',
		required: true,
		type: 'string',
	})
	@IsString()
	rfc: string;
}
