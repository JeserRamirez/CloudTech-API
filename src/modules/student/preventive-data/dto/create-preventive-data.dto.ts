import {
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreatePreventiveDataDto {
	@IsString()
	@MinLength(11)
	@MaxLength(11)
	id_nss: string;
	@IsNumber()
	clinic: number;
	@IsString()
	@IsOptional()
	blood_type?: string;
	@IsString()
	@IsOptional()
	allergies?: string;
	@IsString()
	@IsOptional()
	disability?: string;
	@IsString()
	@IsOptional()
	psychological_problems?: string;
}
