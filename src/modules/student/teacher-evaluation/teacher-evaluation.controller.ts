import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TeacherEvaluationService } from './teacher-evaluation.service';
import { CreateFeedbackDto, CreateResponseQuestionsDto } from './dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { student } from '@prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Teacher Evaluation')
@Controller('student/teacher-evaluation')
export class TeacherEvaluationController {
	constructor(
		private readonly teacherEvaluationService: TeacherEvaluationService,
	) {}

	@Get('')
	@ApiResponse({
		status: 200,
		content: {
			'application/json': {
				example: [
					{
						section_id: 1,
						section_name: 'Calidad de Enseñanza',
						questions: [
							{
								question_id: 7,
								question_text: '¿El docente explica claramente los temas?',
								section_id: 1,
							},
							{
								question_id: 8,
								question_text:
									'¿El docente responde adecuadamente a las dudas?',
								section_id: 1,
							},
							{
								question_id: 13,
								question_text: '¿El docente explica claramente los temas?',
								section_id: 1,
							},
							{
								question_id: 14,
								question_text:
									'¿El docente responde adecuadamente a las dudas?',
								section_id: 1,
							},
						],
					},
					{
						section_id: 2,
						section_name: 'Material Didáctico',
						questions: [
							{
								question_id: 9,
								question_text: '¿El material didáctico es suficiente?',
								section_id: 2,
							},
							{
								question_id: 10,
								question_text: '¿El material de apoyo es útil y claro?',
								section_id: 2,
							},
							{
								question_id: 15,
								question_text: '¿El material didáctico es suficiente?',
								section_id: 2,
							},
							{
								question_id: 16,
								question_text: '¿El material de apoyo es útil y claro?',
								section_id: 2,
							},
						],
					},
					{
						section_id: 3,
						section_name: 'Interacción en Clase',
						questions: [
							{
								question_id: 11,
								question_text: '¿El docente fomenta la participación en clase?',
								section_id: 3,
							},
							{
								question_id: 17,
								question_text: '¿El docente fomenta la participación en clase?',
								section_id: 3,
							},
						],
					},
					{
						section_id: 4,
						section_name: 'Cumplimiento del Programa',
						questions: [
							{
								question_id: 12,
								question_text: '¿El docente respeta los tiempos de clase?',
								section_id: 4,
							},
							{
								question_id: 18,
								question_text: '¿El docente respeta los tiempos de clase?',
								section_id: 4,
							},
						],
					},
					{
						section_id: 5,
						section_name: 'Calidad de Enseñanza',
						questions: [],
					},
					{
						section_id: 6,
						section_name: 'Material Didáctico',
						questions: [],
					},
					{
						section_id: 7,
						section_name: 'Interacción en Clase',
						questions: [],
					},
					{
						section_id: 8,
						section_name: 'Cumplimiento del Programa',
						questions: [],
					},
				],
			},
		},
	})
	@Auth(ValidRoles.student)
	async getTeacherEvaluations() {
		return await this.teacherEvaluationService.getEvaluation();
	}

	@Post('response')
	@ApiBody({
		description: 'Estructura de las respuestas',
		schema: {
			example: {
				'response-questions': {
					responses: [
						{
							question_id: 7,
							score: 1,
							current_class_id: 10,
						},
						{
							question_id: 8,
							score: 4,
							current_class_id: 10,
						},
						{
							question_id: 9,
							score: 3,
							current_class_id: 10,
						},
						{
							question_id: 10,
							score: 2,
							current_class_id: 10,
						},
						{
							question_id: 11,
							score: 2,
							current_class_id: 10,
						},
						{
							question_id: 12,
							score: 2,
							current_class_id: 10,
						},
						{
							question_id: 13,
							score: 2,
							current_class_id: 10,
						},
						{
							question_id: 14,
							score: 2,
							current_class_id: 10,
						},
						{
							question_id: 15,
							score: 2,
							current_class_id: 10,
						},
						{
							question_id: 16,
							score: 2,
							current_class_id: 10,
						},
						{
							question_id: 17,
							score: 2,
							current_class_id: 10,
						},
						{
							question_id: 18,
							score: 2,
							current_class_id: 10,
						},
					],
				},
				feedback: {
					feedback_text: 'asasfsaf',
					current_class_id: 10,
				},
			},
		},
	})
	@Auth(ValidRoles.student)
	async createResponseQuestions(
		@GetUser() user: student,
		@Body('response-questions')
		createResponseQuestionsDto: CreateResponseQuestionsDto,
		@Body('feedback') createFeedbackDto: CreateFeedbackDto,
	) {
		return await this.teacherEvaluationService.createResponseEvaluation(
			user,
			createResponseQuestionsDto,
			createFeedbackDto,
		);
	}

	@Get('student-classes')
	@ApiResponse({
		status: 200,
		content: {
			'application/json': {
				example: [
					{
						current_class_id: 5,
						subject: 'fundamentos de investigacion',
						teacher: 'Jeser Ramirez Estrada',
					},
					{
						current_class_id: 10,
						subject: 'taller de etica',
						teacher: 'Jeser Ramirez Estrada',
					},
					{
						current_class_id: 14,
						subject: 'fundamentos de programacion',
						teacher: 'Jeser Ramirez Estrada',
					},
					{
						current_class_id: 18,
						subject: 'matematicas discretas',
						teacher: 'Jeser Ramirez Estrada',
					},
					{
						current_class_id: 23,
						subject: 'taller de administracion',
						teacher: 'Jeser Ramirez Estrada',
					},
					{
						current_class_id: 1,
						subject: 'calculo diferencial',
						teacher: 'Jeser Ramirez Estrada',
					},
				],
			},
		},
	})
	@Auth(ValidRoles.student)
	async getStudentClasses(@GetUser() user: student) {
		return await this.teacherEvaluationService.getAllStudentClasses(user);
	}

	@Get(':id')
	@ApiResponse({
		status: 200,
		content: {
			'application/json': {
				example: {
					section_id: 3,
					section_name: 'Interacción en Clase',
					questions: [
						{
							question_id: 11,
							question_text: '¿El docente fomenta la participación en clase?',
							section_id: 3,
						},
						{
							question_id: 17,
							question_text: '¿El docente fomenta la participación en clase?',
							section_id: 3,
						},
					],
				},
			},
		},
	})
	@Auth(ValidRoles.student)
	async getTeacherSectionById(@Param('id') id: string) {
		console.log(id);
		return await this.teacherEvaluationService.getSectionById(+id);
	}
}
