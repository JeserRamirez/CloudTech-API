import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TeacherEvaluationService } from './teacher-evaluation.service';
import { CreateFeedbackDto, CreateResponseQuestionsDto } from './dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { student } from '@prisma/client';

@Controller('student/teacher-evaluation')
export class TeacherEvaluationController {
	constructor(
		private readonly teacherEvaluationService: TeacherEvaluationService,
	) {}

	@Get()
	@Auth(ValidRoles.student)
	async getTeacherEvaluations(user: student) {
		return await this.teacherEvaluationService.getEvaluation(user);
	}

	@Get(':id')
	@Auth(ValidRoles.student)
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
