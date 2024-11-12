import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TeacherEvaluationService } from './teacher-evaluation.service';
import { CreateFeedbackDto, CreateResponseQuestionsDto } from './dto';

@Controller('student/teacher-evaluation')
export class TeacherEvaluationController {
	constructor(
		private readonly teacherEvaluationService: TeacherEvaluationService,
	) {}

	@Get()
	async getTeacherEvaluations() {
		return await this.teacherEvaluationService.getEvaluation();
	}

	@Get(':id')
	async getTeacherSectionById(@Param('id') id: string) {
		console.log(id);
		return await this.teacherEvaluationService.getSectionById(+id);
	}

	@Post('response')
	async createResponseQuestions(
		@Body('response-questions')
		createResponseQuestionsDto: CreateResponseQuestionsDto,
		@Body('feedback') createFeedbackDto: CreateFeedbackDto,
	) {
		return await this.teacherEvaluationService.createResponseQuestions(
			createResponseQuestionsDto,
			createFeedbackDto,
		);
	}
}
