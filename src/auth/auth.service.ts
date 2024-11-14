import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import {
	CreateApplicantDto,
	CreateLastStudyLevelDto,
	CreatePreventiveDataDto,
	CreateStudentDto,
	CreateStudentPersonalDataDto,
	CreateStudentTutorDataDto,
	CreateTeacherDto,
	LoginApplicantDto,
	LoginStudentDto,
	LoginTeacherDto,
	ChangePasswordDto,
	ForgotPasswordDto,
	ResetPasswordDto,
} from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { getPeriod } from 'src/common/helpers';
import { student, teacher } from '@prisma/client';
import { nanoid } from 'nanoid';
import { MailService } from './services/mail.service';
import { TokenExpiredException } from './error';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly emailService: MailService,
	) {}

	private async createSession(userId: string, token: string) {
		// Set the expiration time of the token in one hour
		const expiresAt = new Date();
		expiresAt.setHours(expiresAt.getHours() + 1);

		// Delete old sessions
		await this.removeOldSessions(userId);

		// Create a new session
		await this.prisma.session.create({
			data: {
				user_id: userId,
				token: token,
				expires_at: expiresAt,
			},
		});
	}

	private async removeOldSessions(userId: string) {
		await this.prisma.session.deleteMany({
			where: {
				user_id: userId,
				expires_at: { lt: new Date() },
			},
		});
	}

	private async invalidateOldSessions(userId: string) {
		await this.prisma.session.deleteMany({
			where: {
				user_id: userId,
			},
		});
	}

	// Register and login of Applicant
	async createApplicant(
		createApplicantDto: CreateApplicantDto,
		createStudentPersonalDataDto: CreateStudentPersonalDataDto,
		createLastStudyLevelDto: CreateLastStudyLevelDto,
		createPreventiveDataDto: CreatePreventiveDataDto,
		createStudentTutorDataDto: CreateStudentTutorDataDto,
	) {
		try {
			const { curp, password } = createApplicantDto;

			const hashedPassword = await bcrypt.hash(password, 10);
			const curpFormatted = curp.toUpperCase();

			// Obtener las fechas desde la base de datos
			const fees = await this.prisma.fees.findMany({
				where: {
					AND: [{ fee_type: 'preficha' }],
				},
				select: { start_date: true, deadline: true },
			});

			// Filtrar las fechas para el año actual
			const filteredFees = fees.filter(
				(fee) =>
					fee.start_date.getUTCFullYear() === new Date().getUTCFullYear(),
			);

			const [start_date] = filteredFees.map((fee) => fee.start_date);
			const [deadline] = filteredFees.map((fee) => fee.deadline);

			// Obtener la fecha actual en UTC
			const currentDate = new Date();
			currentDate.setHours(currentDate.getHours() - 6); // Ajustar a UTC-6

			if (!start_date || currentDate < start_date || currentDate > deadline) {
				throw new BadRequestException(
					'El proceso de inscripción aún no ha iniciado o ya ha terminado',
				);
			}

			const [applicant] = await this.prisma.$transaction([
				this.prisma.applicant.create({
					data: {
						curp: curpFormatted,
						hashed_password: hashedPassword,
						is_active: true,
						roles: ['applicant'],
						period: getPeriod(new Date()),
						general_data: {
							create: {
								student_personal_data: {
									create: {
										...createStudentPersonalDataDto,
										curp: curpFormatted,
										schoolar_email: '',
									},
								},
								last_study_Level: {
									create: {
										...createLastStudyLevelDto,
									},
								},
								preventive_data: {
									create: {
										...createPreventiveDataDto,
									},
								},
								student_tutor_data: {
									create: {
										...createStudentTutorDataDto,
									},
								},
							},
						},
					},
				}),
			]);

			const token = this.getJwtToken({ id: applicant.curp });

			// Delete old sessions and create a new one
			await this.invalidateOldSessions(applicant.curp);
			await this.createSession(applicant.curp, token);

			return { ...applicant, token };
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error;
			}

			this.handleDBErrors(error);
		}
	}

	async loginApplicant(loginApplicantDto: LoginApplicantDto) {
		const { curp, password } = loginApplicantDto;

		const applicant = await this.prisma.applicant.findUnique({
			where: { curp: curp.toUpperCase() },
			select: { curp: true, hashed_password: true, is_active: true },
		});

		if (!applicant)
			throw new UnauthorizedException('Credentials are not valid (username)');

		if (!bcrypt.compareSync(password, applicant.hashed_password))
			throw new UnauthorizedException('Credentials are not valid (password)');

		if (!applicant.is_active)
			throw new UnauthorizedException(
				'Applicant is not active, talk with the administrator',
			);

		const token = this.getJwtToken({ id: applicant.curp });

		// Delete old sessions and create a new one
		await this.invalidateOldSessions(applicant.curp);
		await this.createSession(applicant.curp, token);

		return { ...applicant, token };
	}

	// Register and login of Student
	async createStudent(createStudentDto: CreateStudentDto) {
		try {
			const { controlNumber, curp, password } = createStudentDto;

			const hashedPassword = await bcrypt.hash(password, 10);

			const curpFormatted = curp.toUpperCase();

			const applicant = await this.prisma.applicant.findUnique({
				where: { curp: curpFormatted },
			});
			
			if (!applicant)
				return new NotFoundException(
					`No applicant was found with the curp: ${curpFormatted}`,
				);
				
			const insReq = await this.prisma.applicant_payment_inscription.findFirst({
				where: { applicant_id: applicant.applicant_id },
				select: { payment_status: true}
			});

			if (!insReq) {
				throw new NotFoundException(`No se encontro informacion sobre la inscripcion`);
			}

			if (insReq.payment_status === false) {
				throw new BadRequestException(`
					No se puede completar la inscripcion por que no 
					se ha recibido el pago de la inscripcion`
				);
			} 


			const student = await this.prisma.student.create({
				data: {
					control_number: controlNumber,
					hashed_password: hashedPassword,
					is_active: true,
					roles: ['student'],
					period: getPeriod(new Date()),
				},
			});

			await this.prisma.$transaction([
				this.prisma.general_data.updateMany({
					where: { applicant_id: applicant.applicant_id },
					data: {
						student_id: student.student_id,
						applicant_id: null,
					},
				}),
				this.prisma.applicant.update({
					where: { curp: curpFormatted },
					data: {
						is_active: false,
					},
				}),
			]);

			const token = this.getJwtToken({ id: student.control_number });
			// Delete old sessions and create a new one
			await this.invalidateOldSessions(student.control_number);
			await this.createSession(student.control_number, token);
			return { ...student, token };
		} catch (error) {
			this.handleDBErrors(error);
		}
	}

	async loginStudent(loginStudentDto: LoginStudentDto) {
		const { controlNumber, password } = loginStudentDto;

		const student = await this.prisma.student.findUnique({
			where: { control_number: controlNumber },
			select: { control_number: true, hashed_password: true, is_active: true },
		});

		if (!student)
			throw new UnauthorizedException('Credentials are not valid (username)');

		if (!bcrypt.compareSync(password, student.hashed_password))
			throw new UnauthorizedException('Credentials are not valid (password)');

		if (!student.is_active)
			throw new UnauthorizedException(
				'Student is not active, talk with the administrator',
			);

		const token = this.getJwtToken({ id: student.control_number });

		// Delete old sessions and create a new one
		await this.invalidateOldSessions(student.control_number);
		await this.createSession(student.control_number, token);

		return { ...student, token };
	}

	// Register and login of Teacher
	async createTeacher(createTeacherDto: CreateTeacherDto) {
		try {
			const { teacherNumber, password } = createTeacherDto;
			const hashedPassword = await bcrypt.hash(password, 10);

			const teacher = await this.prisma.teacher.create({
				data: {
					teacher_number: teacherNumber,
					hashed_password: hashedPassword,
					is_active: true,
					roles: ['teacher'],

					period: getPeriod(new Date()),
				},
			});

			const token = this.getJwtToken({ id: teacher.teacher_number });

			// Delete old sessions and create a new one
			await this.invalidateOldSessions(teacher.teacher_number);
			await this.createSession(teacher.teacher_number, token);

			return { ...teacher, token };
		} catch (error) {
			this.handleDBErrors(error);
		}
	}

	async loginTeacher(loginTeacherDto: LoginTeacherDto) {
		const { teacherNumber, password } = loginTeacherDto;

		const teacher = await this.prisma.teacher.findUnique({
			where: { teacher_number: teacherNumber },
			select: { teacher_number: true, hashed_password: true, is_active: true },
		});

		if (!teacher) {
			throw new UnauthorizedException('Credentials are not valid (username)');
		}

		if (!bcrypt.compareSync(password, teacher.hashed_password)) {
			throw new UnauthorizedException('Credentials are not valid (password)');
		}

		if (!teacher.is_active) {
			throw new UnauthorizedException(
				'Teacher is not active, talk with the administrator',
			);
		}

		const token = this.getJwtToken({ id: teacher.teacher_number });

		// Delete old sessions and create a new one
		await this.invalidateOldSessions(teacher.teacher_number);
		await this.createSession(teacher.teacher_number, token);

		return { ...teacher, token };
	}

	async changePassword(user: any, changePasswordDto: ChangePasswordDto) {
		try {
			const { oldPassword, newPassword } = changePasswordDto;

			if (oldPassword === newPassword) {
				throw new BadRequestException('Type a new password');
			}

			let userId: string;
			if (user.roles.includes('applicant')) {
				userId = user.curp;

				const applicant = await this.prisma.applicant.findUnique({
					where: { curp: userId },
				});

				const isMatch = bcrypt.compareSync(
					oldPassword,
					applicant.hashed_password,
				);

				if (!isMatch) {
					throw new UnauthorizedException('The current password is incorrect');
				}

				await this.prisma.applicant.updateMany({
					where: { curp: userId },
					data: { hashed_password: bcrypt.hashSync(newPassword, 10) },
				});
			} else if (user.roles.includes('student')) {
				userId = user.control_number;

				const student = await this.prisma.student.findUnique({
					where: {
						control_number: userId,
					},
				});

				const isMatch = bcrypt.compareSync(
					oldPassword,
					student.hashed_password,
				);

				if (!isMatch) {
					throw new UnauthorizedException('The current password is incorrect');
				}

				await this.prisma.student.updateMany({
					where: { control_number: userId },
					data: { hashed_password: bcrypt.hashSync(newPassword, 10) },
				});
			} else if (user.roles.includes('teacher')) {
				userId = user.teacher_number;

				const teacher = await this.prisma.teacher.findUnique({
					where: { teacher_number: userId },
				});

				const isMatch = bcrypt.compareSync(
					oldPassword,
					teacher.hashed_password,
				);

				if (!isMatch) {
					throw new UnauthorizedException('The current password is incorrect');
				}

				await this.prisma.teacher.updateMany({
					where: { teacher_number: userId },
					data: { hashed_password: bcrypt.hashSync(newPassword, 10) },
				});
			}

			return { message: 'Password changed successfully!!' };
		} catch (error) {
			if (
				error instanceof BadRequestException ||
				error instanceof UnauthorizedException
			) {
				throw error;
			}

			this.handleDBErrors(error);
		}
	}

	async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
		try {
			const { userId, email } = forgotPasswordDto;
			// Check that user exists
			let user:
				| (teacher & { teacher_personal_data: { schoolar_email: string } })
				| (student & {
						general_data: {
							student_personal_data: { schoolar_email: string }[];
						}[];
				  });

			if (userId.length === 3) {
				const teacher = await this.prisma.teacher.findUnique({
					where: { teacher_number: userId },
					include: {
						teacher_personal_data: { select: { schoolar_email: true } },
					},
				});

				if (!teacher) throw new NotFoundException('Teacher not found');

				if (
					!(
						teacher.teacher_number === userId &&
						teacher.teacher_personal_data.schoolar_email === email
					)
				)
					throw new NotFoundException({
						message: 'Email does not exist',
					});

				user = teacher;

				//If user exists, delete all the old tokens so only the new one will work
				await this.prisma.reset_password.deleteMany({
					where: { userId: user.teacher_number },
				});

				// If user exists, generate password reset link
				const reset_token = nanoid(64);
				const expiry_date = new Date();
				expiry_date.setMinutes(expiry_date.getMinutes() + 15);

				// Send the link to the user (using nodemailer)
				this.emailService.sendPasswordResetEmail(email, reset_token);

				await this.prisma.reset_password.create({
					data: {
						token: reset_token,
						userId: user.teacher_number,
						expiration_date: expiry_date,
					},
				});

				// console.log(user.teacher_personal_data.schoolar_email);
			} else if (userId.length === 8) {
				const student = await this.prisma.student.findUnique({
					where: { control_number: userId },
					include: {
						general_data: {
							select: {
								student_personal_data: {
									select: {
										schoolar_email: true,
									},
								},
							},
						},
					},
				});

				if (!student) throw new NotFoundException('Student not found');

				if (
					!(
						student.control_number === userId &&
						student.general_data[0].student_personal_data[0].schoolar_email ===
							email
					)
				)
					throw new NotFoundException({
						message: 'Email does not match',
					});

				user = student;

				//If user exists, delete all the old tokens so only the new one will work
				await this.prisma.reset_password.deleteMany({
					where: { userId: user.control_number },
				});

				// If user exists, generate password reset link
				const reset_token = nanoid(64);
				const expiry_date = new Date();
				expiry_date.setMinutes(expiry_date.getMinutes() + 15);

				// Send the link to the user (using nodemailer)
				await this.emailService.sendPasswordResetEmail(email, reset_token);

				await this.prisma.reset_password.create({
					data: {
						token: reset_token,
						userId: user.control_number,
						expiration_date: expiry_date,
					},
				});

				// console.log(user.general_data[0].student_personal_data[0].schoolar_email);
			}

			return {
				message: 'If this user exists, will receive an email',
			};
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}

			this.handleDBErrors(error);
		}
	}

	async resetPassword(resetPasswordDto: ResetPasswordDto) {
		try {
			// Find a valid reset token
			const token = await this.prisma.reset_password.findUnique({
				where: { token: resetPasswordDto.token },
			});

			if (!token) throw new NotFoundException('No token found');

			const expirationDateString = token.expiration_date;
			const expirationDate = new Date(expirationDateString);
			const currentDate = new Date();

			if (currentDate.getTime() > expirationDate.getTime()) {
				await this.prisma.reset_password.delete({
					where: { token: resetPasswordDto.token },
				});
				throw new TokenExpiredException(expirationDate);
			}

			const hashedPassword = bcrypt.hashSync(resetPasswordDto.newPassword, 10);

			// Change user password
			if (token.userId.length === 3) {
				await this.prisma.teacher.update({
					where: { teacher_number: token.userId },
					data: {
						hashed_password: hashedPassword,
					},
				});

				// Delete the token after the token has been used
				await this.prisma.reset_password.delete({
					where: { token: resetPasswordDto.token },
				});
			} else if (token.userId.length === 8) {
				await this.prisma.student.update({
					where: { control_number: token.userId },
					data: {
						hashed_password: hashedPassword,
					},
				});

				// Delete the token after the token has been used
				await this.prisma.reset_password.delete({
					where: { token: resetPasswordDto.token },
				});
			}

			return { message: 'Password changed succesfully' };
		} catch (error) {
			if (
				error instanceof NotFoundException ||
				error instanceof TokenExpiredException
			) {
				throw error;
			}

			this.handleDBErrors(error);
		}
	}

	async logout(user: any) {
		let userId: string;
		if (user.roles.includes('applicant')) {
			userId = user.curp;
		} else if (user.includes('student')) {
			userId = user.control_number;
		} else if (user.includes('teacher')) {
			userId = user.teacher_number;
		}

		// Delete all active sessions of the user
		await this.invalidateOldSessions(userId);
	}

	async checkAuthStatus(user: any) {
		return {
			...user,
			token: this.getJwtToken({ id: user.id }),
		};
	}

	private getJwtToken(payload: JwtPayload) {
		const token = this.jwtService.sign(payload);

		return token;
	}

	private handleDBErrors(error: any): never {
		if (error === undefined)
			throw new NotFoundException('This record does not exist');

		if (error.code == '23505') throw new BadRequestException(error.detail);

		if (error.code == 'P2002')
			throw new BadRequestException(
				'There already exists an user with that username',
			);

		console.log(error);
		throw new InternalServerErrorException('Please check server logs');
	}
}
