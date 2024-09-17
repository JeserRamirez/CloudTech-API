import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateTeacherDto {
	@ApiProperty({
		description: 'Teacher number',
		example: '123',
		type: 'string',
		format: 'string',
		required: true,
	})
	@IsString()
	@MinLength(3)
	@MaxLength(3)
	@Matches(/^\d{3}$/, {
		message: 'The teacher number is not in a valid format',
	})
	teacherNumber: string;

	@ApiProperty({
		description: 'Password of the teacher',
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
