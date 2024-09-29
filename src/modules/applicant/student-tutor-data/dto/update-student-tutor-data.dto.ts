import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentTutorDataDto } from './create-student-tutor-data.dto';

export class UpdateStudentTutorDataDto extends PartialType(
	CreateStudentTutorDataDto,
) {}
