import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherPersonalDataDto } from './create-teacher-personal-data.dto';

export class UpdateTeacherPersonalDataDto extends PartialType(
	CreateTeacherPersonalDataDto,
) {}
