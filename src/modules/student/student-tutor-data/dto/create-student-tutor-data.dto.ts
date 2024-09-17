import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNumber,
	IsOptional,
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
		nullable: false,
		required: true,
	})
	@IsString()
	firstname: string;

	@ApiProperty({
		description: 'Lastname of the tutor',
		example: 'Garcia Perez',
		type: 'string',
		nullable: false,
		required: true,
	})
	@IsString()
	lastname: string;

	@ApiProperty({
		description: 'Street name of the tutor',
		example: 'Calle Altamirano',
		type: 'string',
		nullable: true,
		required: false,
	})
	@IsString()
	@IsOptional()
	street_name?: string;

	@ApiProperty({
		description: 'Street number of the tutor',
		example: '123',
		type: 'number',
		nullable: true,
		required: false,
	})
	@IsNumber()
	@IsOptional()
	street_number?: number;

	@ApiProperty({
		description: 'City of the tutor',
		example: 'San Jose',
		type: 'string',
		nullable: true,
		required: false,
	})
	@IsString()
	@IsOptional()
	city?: string;

	@ApiProperty({
		description: 'Postal code of the tutor',
		example: '96500',
		type: 'string',
		nullable: true,
		required: false,
	})
	@IsString()
	@MinLength(5)
	@MaxLength(5)
	@IsOptional()
	cp?: string;

	@ApiProperty({
		description: 'Personal email of the tutor',
		example: 'mario.garcia@gmail.com',
		type: 'string',
		nullable: true,
		required: false,
	})
	@IsEmail()
	@IsOptional()
	personal_email?: string;

	@ApiProperty({
		description: 'Phone number of the tutor',
		example: '+54 9123456789',
		type: 'string',
		nullable: true,
		required: false,
	})
	@IsPhoneNumber()
	@IsOptional()
	phone?: string;

	@ApiProperty({
		description: 'Workplace of the tutor',
		example: 'Empresa XYZ',
		type: 'string',
		nullable: true,
		required: false,
	})
	@IsString()
	@IsOptional()
	workplace?: string;
}
