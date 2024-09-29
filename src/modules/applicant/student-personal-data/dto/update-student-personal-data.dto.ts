import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentPersonalDataDto } from './create-student-personal-data.dto';

export class UpdateStudentPersonalDataDto extends PartialType(
	CreateStudentPersonalDataDto,
) {}
