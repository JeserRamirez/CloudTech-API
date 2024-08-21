import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginStudentDto {
	@IsString()
	@MinLength(8)
	@MaxLength(8)
	@Matches(/^\d{2}\d{2}\d{4}$/, {
		message: 'The control number is not in a valid format',
	})
	controlNumber: string;

	@IsString()
	@MinLength(6)
	@MaxLength(50)
	@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			'The password must contain at least one uppercase, lowercase, number and more than 5 characters',
	})
	password: string;
}
