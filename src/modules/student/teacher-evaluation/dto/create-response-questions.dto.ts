import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, Max, Min, ValidateNested } from 'class-validator';

class Response {
	@ApiProperty({
		description: 'ID de la pregunta',
		required: true,
		type: 'number',
	})
	@IsNumber()
	question_id: number;

	@ApiProperty({
		description: 'Puntaje de la respuesta',
		required: true,
		type: 'number',
		minimum: 1,
		maximum: 5,
	})
	@IsNumber()
	@Min(1)
	@Max(5)
	score: number;

	@ApiProperty({
		description: 'ID de la clase actual',
		required: true,
		type: 'number',
	})
	@IsNumber()
	current_class_id: number;
}

export class CreateResponseQuestionsDto {
	@ApiProperty({
		description: 'Respuestas del estudiante',
		required: true,
		type: 'array',
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Response)
	responses: Response[];
}
