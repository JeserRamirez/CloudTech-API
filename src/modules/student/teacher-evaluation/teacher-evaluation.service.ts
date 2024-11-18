import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeedbackDto, CreateResponseQuestionsDto } from './dto';
import { student } from '@prisma/client';

@Injectable()
export class TeacherEvaluationService {
	constructor(private readonly prisma: PrismaService) {}

	// Métodos para evaluation_section
	async getEvaluation(user: student) {
		console.log(user);
		return await this.prisma.evaluation_section.findMany({
			include: { questions: true },
		});
	}

	async getSectionById(id: number) {
		return await this.prisma.evaluation_section.findUnique({
			where: { section_id: id },
			include: { questions: true },
		});
	}

	// TODO: Implement evaluation for each subject
	async createResponseEvaluation(
		user: student,
		createResponseQuestionDto: CreateResponseQuestionsDto,
		createFeedbackDto: CreateFeedbackDto,
	) {
		try {
			const evaluation_date = await this.validateEvaluationDate(
				user.student_id,
			);

			const evaluation = await this.getEvaluation(user);

			const questions = evaluation.map((e) => e.questions || []);
			const totalQuestions = questions.flat().length;

			const { student_id } = user;
			const { responses } = createResponseQuestionDto;

			if (responses.length < totalQuestions) {
				throw new BadRequestException(
					'Todas las preguntas deben de ser contestadas',
				);
			}

			await this.prisma.$transaction([
				this.prisma.evaluation_response.createMany({
					data: responses.map(({ evaluation_id, question_id, score }) => ({
						student_id,
						evaluation_id,
						question_id,
						score,
					})),
				}),
				this.prisma.evaluation_feedback.create({
					data: {
						evaluation_id: evaluation_date.evaluation_id,
						feedback_text: createFeedbackDto.feedback_text,
					},
				}),
			]);
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error;
			}
		}
	}

	async validateEvaluationDate(student_id: number) {
		// TODO: validation of evaluation date based on the period
		const { period } = await this.prisma.student_current_status.findFirst({
			where: { student_id },
		});

		const evaluation_date = await this.prisma.evaluation_date.findFirst({
			where: { period: { name: period } },
		});

		if (evaluation_date.end_date <= new Date()) {
			throw new BadRequestException(
				'El perido de evaluacion docente ya ha finalizado',
			);
		}

		if (evaluation_date.start_date <= new Date()) {
			return await this.prisma.evaluation.findFirst({
				where: {
					evaluation_date_id: evaluation_date.evaluation_date_id,
				},
			});
		}

		throw new BadRequestException(
			'No ha sido encontrada una evaluacion para el perido actual',
		);
	}
}
