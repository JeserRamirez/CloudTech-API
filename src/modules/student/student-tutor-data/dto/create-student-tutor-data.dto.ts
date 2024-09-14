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
	@IsOptional()
	personal_email?: string;
	@IsPhoneNumber()
	@IsOptional()
	phone?: string;
	@IsString()
	@IsOptional()
	workplace?: string;
}
