import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeedbackDto, CreateResponseQuestionsDto } from './dto';
import { student } from '@prisma/client';

@Injectable()
export class TeacherEvaluationService {
	constructor(private readonly prisma: PrismaService) {}

	async getEvaluation() {
		const evaluation = await this.prisma.evaluation_section.findMany({
			include: { questions: true },
		});

		if (!evaluation) {
			throw new NotFoundException('La evaluación docente no existe');
		}

		return evaluation;
	}

	async getSectionById(id: number) {
		const section = await this.prisma.evaluation_section.findUnique({
			where: { section_id: id },
			include: { questions: true },
		});

		if (!section) {
			throw new NotFoundException(
				`La sección ${section} de la evaluación docente no existe`,
			);
		}

		return section;
	}

	async createResponseEvaluation(
		user: student,
		createResponseQuestionDto: CreateResponseQuestionsDto,
		createFeedbackDto: CreateFeedbackDto,
	) {
		try {
			const evaluation_date = await this.validateEvaluationDate(
				user.student_id,
			);

			const evaluation = await this.getEvaluation();

			const questions = evaluation.map((e) => e.questions || []);
			const totalQuestions = questions.flat().length;

			const { student_id } = user;
			const { responses } = createResponseQuestionDto;

			if (responses.length < totalQuestions) {
				throw new BadRequestException(
					'Todas las preguntas deben de ser contestadas',
				);
			}

			await this.isTeacherEvaluationCompleted(
				user.student_id,
				createFeedbackDto.current_class_id,
			);

			await this.prisma.$transaction([
				this.prisma.evaluation_response.createMany({
					data: responses.map(({ question_id, score, current_class_id }) => ({
						question_id,
						score,
						evaluation_id: evaluation_date.evaluation_id,
						student_id: student_id,
						student_current_class_id: current_class_id,
					})),
				}),
				this.prisma.evaluation_feedback.create({
					data: {
						student_id: student_id,
						evaluation_id: evaluation_date.evaluation_id,
						feedback_text: createFeedbackDto.feedback_text,
						student_current_class_id: createFeedbackDto.current_class_id,
					},
				}),
			]);
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error;
			}
		}
	}

	async getAllStudentClasses(user: student) {
		const current_period = await this.prisma.general_data
			.findFirst({
				where: { student_id: user.student_id },
				select: { scholar_data: { select: { current_period: true } } },
			})
			.then((data) => data?.scholar_data?.[0]?.current_period);

		const classes = await this.prisma.student_current_class.findMany({
			where: {
				AND: [
					{ student_id: user.student_id },
					{ class_schedule: { group: { period: current_period } } },
				],
			},
			select: {
				id_current_class: true,
				class_schedule: {
					select: {
						teacher: {
							select: {
								teacher_personal_data: {
									select: { firstname: true, lastname: true },
								},
							},
						},
						subject_plan_relation: {
							select: {
								subject: { select: { subject_name: true } },
							},
						},
					},
				},
			},
		});

		const groupedClasses = classes.reduce((acc, curr) => {
			const subjectName =
				curr.class_schedule.subject_plan_relation.subject.subject_name;
			const teacher = curr.class_schedule.teacher.teacher_personal_data;
			const currentClassId = curr.id_current_class;

			if (!acc[subjectName]) {
				acc[subjectName] = {
					current_class_id: currentClassId,
					subject: subjectName,
					teacher: `${teacher.firstname} ${teacher.lastname}`,
				};
			}
			return acc;
		}, {});

		return Object.values(groupedClasses);
	}

	async validateEvaluationDate(student_id: number) {
		const current_period = await this.prisma.general_data
			.findFirst({
				where: { student_id: student_id },
				select: { scholar_data: { select: { current_period: true } } },
			})
			.then((data) => data.scholar_data?.[0]?.current_period);

		if (!current_period) {
			throw new BadRequestException(
				'No se ha encontrado un perido en el estado actual del estudiante, informar a un administrador',
			);
		}

		const evaluation_date = await this.prisma.evaluation_date.findFirst({
			where: { period: { name: current_period } },
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

	async isTeacherEvaluationCompleted(
		student_id: number,
		student_current_class_id: number,
	) {
		const responses = await this.prisma.evaluation_response.findMany({
			where: { AND: [{ student_id }, { student_current_class_id }] },
		});

		const feedback = await this.prisma.evaluation_feedback.findMany({
			where: { AND: [{ student_id }, { student_current_class_id }] },
		});

		if (responses && feedback) {
			throw new BadRequestException(
				'Ya ha sido realizada la evaluacion docente de esta materia',
			);
		}
	}
}
