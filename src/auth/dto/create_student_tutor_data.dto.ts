import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsPhoneNumber,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateStudentTutorDataDto {
	@ApiProperty({
		description: 'Firstname of the tutor',
		example: 'Mario',
		type: 'string',
		required: true,
	})
	@IsString()
	firstname: string;

	@ApiProperty({
		description: 'Lastname of the tutor',
		example: 'Garcia Perez',
		type: 'string',
		required: true,
	})
	@IsString()
	lastname: string;

	@ApiProperty({
		description: 'Street name of the tutor',
		example: 'Calle Altamirano',
		type: 'string',
		required: true,
	})
	@IsString()
	street_name: string;

	@ApiProperty({
		description: 'Street number of the tutor',
		example: 'S/N or 123',
		type: 'string',
		required: true,
	})
	@IsString()
	street_number: string;

	@ApiProperty({
		description: 'State of the tutor',
		example: 'San Jose',
		type: 'string',
		required: true,
	})
	@IsString()
	state: string;

	@ApiProperty({
		description: 'Neighborhood of the tutor',
		example: 'San Jose',
		type: 'string',
		required: true,
	})
	@IsString()
	neighborhood: string;

	@ApiProperty({
		description: 'Home phone number of the tutor',
		example: '+54 9123456789',
		type: 'string',
		required: true,
	})
	@IsPhoneNumber()
	home_phone: string;

	@ApiProperty({
		description: 'Phone number of the tutor',
		example: '+54 9123456789',
		type: 'string',
		required: true,
	})
	@IsPhoneNumber()
	mobile_phone: string;

	@ApiProperty({
		description: 'Postal code of the tutor',
		example: '96500',
		type: 'string',
		required: true,
	})
	@IsString()
	@MinLength(5)
	@MaxLength(5)
	cp: string;

	@ApiProperty({
		description: 'Personal email of the tutor',
		example: 'mario.garcia@gmail.com',
		type: 'string',
		required: true,
	})
	@IsEmail()
	personal_email: string;

	@ApiProperty({
		description: 'RFC',
		example: 'PMG920101ABC01',
		required: true,
		type: 'string',
	})
	@IsString()
	rfc: string;

	@ApiProperty({
		description: 'Workplace of the tutor',
		example: 'Empresa XYZ',
		type: 'string',
		required: true,
	})
	@IsString()
	workplace: string;
}
