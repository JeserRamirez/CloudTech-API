import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginStudentDto {
	@ApiProperty({
		description: 'Control number of the student',
		type: 'string',
		example: '20230523',
		minLength: 8,
		maxLength: 8,
		required: true,
	})
	@IsString()
	@MinLength(8)
	@MaxLength(8)
	@Matches(/^\d{2}\d{2}\d{4}$/, {
		message: 'The control number is not in a valid format',
	})
	controlNumber: string;

	@ApiProperty({
		description: 'Password of the student',
		type: 'string',
		minLength: 6,
		maxLength: 50,
		example: 'Password123!',
		required: true,
	})
	@IsString()
	@MinLength(6)
	@MaxLength(50)
	@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			'The password must contain at least one uppercase, lowercase, number and more than 5 characters',
	})
	password: string;
}
