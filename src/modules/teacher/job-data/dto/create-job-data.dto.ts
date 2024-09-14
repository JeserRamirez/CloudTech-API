import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateJobDataDto {
	@IsString()
	plaza: string;
	@IsString()
	degree: string;
	@IsDate()
	@Type(() => Date)
	entry_date: Date;
	@IsString()
	department: string;
}
