import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class GetGroupsDto {
  @ApiProperty({
    description: 'Number of semester',
		required: true,
		type: 'Number',
		example: 'Any number from 1 of 12',
	})
  @IsNumber()
  semester: number;
}