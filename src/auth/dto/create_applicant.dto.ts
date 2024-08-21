import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateApplicantDto {
	@IsString()
	@MinLength(18)
	@MaxLength(18)
	@Matches(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]{2}$/, {
		message: 'The CURP does not have a valid format',
	})
	curp: string;

	@IsString()
	@MinLength(6)
	@MaxLength(50)
	@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			'The password must contain at least one uppercase, lowercase, number and more than 5 characters',
	})
	password: string;
}
