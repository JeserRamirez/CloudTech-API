import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateJobDataDto {
	@ApiProperty({
		description: 'Plaza del empleo',
		required: true,
		nullable: false,
		type: 'string',
	})
	@IsString()
	plaza: string;

	@ApiProperty({
		description: 'Grado académico',
		required: true,
		nullable: false,
		type: 'string',
	})
	@IsString()
	degree: string;

	@ApiProperty({
		description: 'Fecha de entrada al empleo',
		required: true,
		nullable: false,
		type: 'string',
		format: 'date',
		example: '2022-01-01',
	})
	@IsDate()
	@Type(() => Date)
	entry_date: Date;

	@ApiProperty({
		description: 'Departamento',
		required: true,
		nullable: false,
		type: 'string',
		example: 'Departamento de Ciencias Básicas',
	})
	@IsString()
	department: string;
}
