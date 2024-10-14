import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class ForgotPasswordDto {
	@ApiProperty({
		description:
			'User ID to confirm (It can be a teacher number or control number)',
		type: 'string',
		minLength: 3,
		maxLength: 8,
		example: '20230239 or 148',
	})
	@IsString()
	@Matches(/(^\d{3}$)|(^\d{2}\d{2}\d{4}$)/, {
		message:
			'The userId must be either a valid teacher number (3 digits) or control number (8 digits)',
	})
	@IsString()
	userId: string; // It can be student ID (20230265) or teacher ID (150)

	@ApiProperty({
		description: 'Schoolar email of the user',
		type: 'string',
		example: 'l20230235@minatitlan.tecnm.mx or pe.grma@minatitlan.tecnm.mx',
	})
	@Matches(/^[\w-\.]+@minatitlan\.tecnm\.mx$/, {
		message: 'The email must have the next domain @minatitlan.tecnm.mx',
	})
	@IsEmail()
	email: string;
}
