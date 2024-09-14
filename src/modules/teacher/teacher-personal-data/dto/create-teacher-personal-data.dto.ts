import {
	IsEmail,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateTeacherPersonalDataDto {
	@IsString()
	firstname: string;
	@IsString()
	lastname: string;
	@IsString()
	@IsOptional()
	street_name?: string;
	@IsNumber()
	@IsOptional()
	street_number?: number;
	@IsString()
	@IsOptional()
	city?: string;
	@IsString()
	@MinLength(5)
	@MaxLength(5)
	@IsOptional()
	cp?: string;
	@IsEmail()
	personal_email: string;
	@IsEmail()
	schoolar_email: string;
}
