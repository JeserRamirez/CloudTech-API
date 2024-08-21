import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginTeacherDto {
	@IsString()
	@MinLength(3)
	@MaxLength(3)
	@Matches(/^\d{3}$/, {
		message: 'The teacher number is not in a valid format',
	})
	teacherNumber: string;

	@IsString()
	@MinLength(6)
	@MaxLength(50)
	@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			'The password must contain at least one uppercase, lowercase, number and more than 5 characters',
	})
	password: string;
}
