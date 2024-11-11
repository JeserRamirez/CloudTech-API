import { PartialType } from '@nestjs/swagger';
import { CreateTeacherEvaluationDto } from './create-teacher-evaluation.dto';

export class UpdateTeacherEvaluationDto extends PartialType(CreateTeacherEvaluationDto) {}
