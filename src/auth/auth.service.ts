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
} from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { LoginStudentDto } from './dto/login_student.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	// Register and login of Applicant
	async createApplicant(createApplicantDto: CreateApplicantDto) {
		try {
			const { curp, password } = createApplicantDto;

			const hashedPassword = await bcrypt.hash(password, 10);

			const applicant = await this.prisma.applicant.create({
				data: {
					curp: curp,
					password: hashedPassword,
					isActive: true,
					roles: ['applicant'],
				},
			});

			return {
				...applicant,
				token: this.getJwtToken({ id: applicant.curp }),
			};
		} catch (error) {
			this.handleDBErrors(error);
		}
	}
	async loginApplicant(loginApplicantDto: LoginApplicantDto) {
		const { curp, password } = loginApplicantDto;

		const applicant = await this.prisma.applicant.findUnique({
			where: { curp: curp },
			select: { curp: true, password: true },
		});

		if (!applicant)
			throw new UnauthorizedException('Credencials are not valid (username)');

		if (!bcrypt.compareSync(password, applicant.password))
			throw new UnauthorizedException('Credencial are not valid (password)');

		return {
			...applicant,
			token: this.getJwtToken({ id: applicant.curp }),
		};
		// TDOO: Retornar el JWT de acceso
	}

	// Register and login of Student
	async createStudent(createStudentDto: CreateStudentDto) {
		try {
			const { controlNumber, password } = createStudentDto;

			if (!password) {
				throw new BadRequestException('Password is required');
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const user = await this.prisma.student.create({
				data: {
					control_number: controlNumber,
					password: hashedPassword,
					isActive: true,
					roles: ['student'],
				},
			});

			return {
				...user,
				token: this.getJwtToken({ id: user.control_number }),
			};
		} catch (error) {
			this.handleDBErrors(error);
		}
	}
	async loginStudent(loginStudentDto: LoginStudentDto) {
		const { controlNumber, password } = loginStudentDto;

		const student = await this.prisma.student.findUnique({
			where: { control_number: controlNumber },
			select: { control_number: true, password: true },
		});

		if (!student)
			throw new UnauthorizedException('Credencials are not valid (username)');

		if (!bcrypt.compareSync(password, student.password))
			throw new UnauthorizedException('Credencial are not valid (password)');

		return {
			...student,
			token: this.getJwtToken({ id: student.control_number }),
		};
		// TDOO: Retornar el JWT de acceso
	}

	// // Register and login of Teacher
	// async createTeacher(createTeacherDto: CreateTeacherDto) {
	// 	try {
	// 		const { teacherNumber, password } = createTeacherDto;

	// 		if (!password) {
	// 			throw new BadRequestException('Password is required');
	// 		}

	// 		const hashedPassword = await bcrypt.hash(password, 10);

	// 		const user = await this.prisma.teacher.create({
	// 			data: {
	// 				teacher_number: teacherNumber,
	// 				password: hashedPassword,
	// 				isActive: true,
	// 				roles: ['teacher'],
	// 			},
	// 		});

	// 		return {
	// 			...user,
	// 			token: this.getJwtToken({ id: user.teacher_number }),
	// 		};
	// 	} catch (error) {
	// 		this.handleDBErrors(error);
	// 	}
	// }

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

		console.log(error);

		if (error.code == 'P2002')
			throw new BadRequestException(
				'There already exists an user with that username',
			);

		throw new InternalServerErrorException('Please check server logs');
	}
}
