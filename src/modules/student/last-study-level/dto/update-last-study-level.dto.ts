import { PartialType } from '@nestjs/mapped-types';
import { CreateLastStudyLevelDto } from './create-last-study-level.dto';

export class UpdateLastStudyLevelDto extends PartialType(
	CreateLastStudyLevelDto,
) {}
