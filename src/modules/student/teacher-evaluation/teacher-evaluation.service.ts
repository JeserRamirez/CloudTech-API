import { Injectable } from '@nestjs/common';
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

	async getQuestionsBySection(section_id: number) {
		return this.prisma.evaluation_question.findMany({
			where: { section_id },
		});
	}

	async createResponseQuestions(
		createResponseQuestionDto: CreateResponseQuestionsDto,
		createFeedbackDto: CreateFeedbackDto,
	) {
		// TODO: evaluation_id depends on the period

		const { responses } = createResponseQuestionDto;
		const [evaluation] = responses;

		return responses;

		// return { createResponseQuestionDto, createFeedbackDto };
	}

	// Métodos para evaluation
	async getEvaluationById(evaluation_id: number) {
		return this.prisma.evaluation.findUnique({
			where: { evaluation_id },
		});
	}

	async getResponsesByEvaluation(evaluation_id: number) {
		return this.prisma.evaluation_response.findMany({
			where: { evaluation_id },
		});
	}

	// Métodos para evaluation_feedback
	async createFeedback(evaluation_id: number, feedback_text: string) {
		return this.prisma.evaluation_feedback.create({
			data: { evaluation_id, feedback_text },
		});
	}

	async getFeedbackByEvaluation(evaluation_id: number) {
		return this.prisma.evaluation_feedback.findMany({
			where: { evaluation_id },
		});
	}

	async validateEvaluationDate() {
		// TODO: validation of evaluation date based on the period
	}
}
