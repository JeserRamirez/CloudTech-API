import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
	CreateApplicantDto,
	CreateStudentDto,
	CreateTeacherDto,
	LoginApplicantDto,
	LoginStudentDto,
	LoginTeacherDto,
} from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { getPeriod } from 'src/common/helpers';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
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
	async createApplicant(createApplicantDto: CreateApplicantDto) {
		try {
			const { curp, password } = createApplicantDto;
			const hashedPassword = await bcrypt.hash(password, 10);

			const applicant = await this.prisma.applicant.create({
				data: {
					curp: curp.trim().toLowerCase(),
					hashed_password: hashedPassword,
					is_active: true,
					roles: ['applicant'],

					period: getPeriod(new Date()),
				},
			});

			const token = this.getJwtToken({ id: applicant.curp });

			// Delete old sessions and create a new one
			await this.invalidateOldSessions(applicant.curp);
			await this.createSession(applicant.curp, token);

			return { ...applicant, token };
		} catch (error) {
			this.handleDBErrors(error);
		}
	}

	async loginApplicant(loginApplicantDto: LoginApplicantDto) {
		const { curp, password } = loginApplicantDto;

		const applicant = await this.prisma.applicant.findUnique({
			where: { curp: curp.trim().toLowerCase() },
			select: { curp: true, hashed_password: true },
		});

		if (!applicant)
			throw new UnauthorizedException('Credentials are not valid (username)');

		if (!bcrypt.compareSync(password, applicant.hashed_password))
			throw new UnauthorizedException('Credentials are not valid (password)');

		const token = this.getJwtToken({ id: applicant.curp });

		// Delete old sessions and create a new one
		await this.invalidateOldSessions(applicant.curp);
		await this.createSession(applicant.curp, token);

		return { ...applicant, token };
	}

	// Register and login of Student
	async createStudent(createStudentDto: CreateStudentDto) {
		try {
			const { controlNumber, password } = createStudentDto;
			const hashedPassword = await bcrypt.hash(password, 10);

			const student = await this.prisma.student.create({
				data: {
					control_number: controlNumber.trim(),
					hashed_password: hashedPassword,
					is_active: true,
					roles: ['student'],

					period: getPeriod(new Date()),
				},
			});

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
			where: { control_number: controlNumber.trim() },
			select: { control_number: true, hashed_password: true },
		});

		if (!student)
			throw new UnauthorizedException('Credentials are not valid (username)');

		if (!bcrypt.compareSync(password, student.hashed_password))
			throw new UnauthorizedException('Credentials are not valid (password)');

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
					teacher_number: teacherNumber.trim(),
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
			where: { teacher_number: teacherNumber.trim() },
			select: { teacher_number: true, hashed_password: true },
		});

		if (!teacher)
			throw new UnauthorizedException('Credentials are not valid (username)');

		if (!bcrypt.compareSync(password, teacher.hashed_password))
			throw new UnauthorizedException('Credentials are not valid (password)');

		const token = this.getJwtToken({ id: teacher.teacher_number });

		// Delete old sessions and create a new one
		await this.invalidateOldSessions(teacher.teacher_number);
		await this.createSession(teacher.teacher_number, token);

		return { ...teacher, token };
	}

	async logout(userId: string) {
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
		if (error.code == '23505') throw new BadRequestException(error.detail);

		if (error.code == 'P2002')
			throw new BadRequestException(
				'There already exists an user with that username',
			);
		console.log(error);
		throw new InternalServerErrorException('Please check server logs');
	}
}
