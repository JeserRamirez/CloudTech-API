import { PartialType } from '@nestjs/mapped-types';
import { CreatePreventiveDataDto } from './create-preventive-data.dto';

export class UpdatePreventiveDataDto extends PartialType(
	CreatePreventiveDataDto,
) {}
