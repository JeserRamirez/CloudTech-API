import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
	@ApiProperty({
		description: 'Token of the forgot password route',
		type: 'string',
		example: 'kk9EftpI0AJa3aWcar108AAmRfY6ri21Nma30-_9uptxPuKo0OLSbIUdVvBvFhGL',
	})
	@IsString()
	token: string;

	@ApiProperty({
		description: 'Password of the user',
		type: 'string',
		minLength: 6,
		maxLength: 50,
		example: 'Password123!',
	})
	@IsString()
	@MinLength(6)
	@MaxLength(50)
	@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			'The password must contain at least one uppercase, lowercase, number and more than 5 characters',
	})
	newPassword: string;
}
