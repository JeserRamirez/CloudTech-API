import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {
	@ApiProperty({
		description: 'Retroalimentacion para el maestro',
		required: true,
		type: 'string',
	})
	@IsString()
	feedback_text: string;
	@IsNumber()
	current_class_id: number;
}
