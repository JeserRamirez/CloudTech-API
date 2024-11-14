import { Type } from 'class-transformer';
import { IsArray, IsNumber, Max, Min, ValidateNested } from 'class-validator';

class Response {
	@IsNumber()
	evaluation_id: number;
	@IsNumber()
	question_id: number;
	@IsNumber()
	@Min(1)
	@Max(5)
	score: number;
}

export class CreateResponseQuestionsDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Response)
	responses: Response[];
}
