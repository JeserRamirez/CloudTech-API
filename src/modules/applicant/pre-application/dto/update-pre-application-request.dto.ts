import { PartialType } from '@nestjs/mapped-types';
import { CreatePreApplicationRequestDto } from './create-pre-application-request.dto.ts.dto';

export class UpdatePreApplicationRequestDto extends PartialType(
	CreatePreApplicationRequestDto,
) {}
