import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDataDto } from './create-job-data.dto';

export class UpdateJobDataDto extends PartialType(CreateJobDataDto) {}
