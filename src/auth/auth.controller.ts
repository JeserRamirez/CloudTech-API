import { Body, Controller, Get, Post } from '@nestjs/common';

import {
	CreateApplicantDto,
	CreateStudentDto,
	CreateTeacherDto,
	LoginApplicantDto,
	LoginStudentDto,
	LoginTeacherDto,
} from './dto';
import { ValidRoles } from './interfaces';
import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle({ auth: false })
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	// Register and login of Applicant
	@Post('register-applicant')
	createApplicant(@Body() createApplicantDto: CreateApplicantDto) {
		return this.authService.createApplicant(createApplicantDto);
	}

	@Post('login-applicant')
	loginApplicant(@Body() loginApplicantDto: LoginApplicantDto) {
		return this.authService.loginApplicant(loginApplicantDto);
	}
	@Post('register-student')
	createStudent(@Body() createStudentDto: CreateStudentDto) {
		return this.authService.createStudent(createStudentDto);
	}

	@Post('login-student')
	loginStudent(@Body() loginStudentDto: LoginStudentDto) {
		return this.authService.loginStudent(loginStudentDto);
	}
	@Post('register-teacher')
	createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
		return this.authService.createTeacher(createTeacherDto);
	}
	@Post('login-teacher')
	loginTeacher(@Body() loginTeacherDto: LoginTeacherDto) {
		return this.authService.loginTeacher(loginTeacherDto);
	}

	@Post('logout')
	async logout(@Body('userId') userId: string) {
		await this.authService.logout(userId);
		return { message: 'Logged out successfully' };
	}

	@Get('check-auth-status')
	@Auth(ValidRoles.applicant)
	CheckAuthStatus(@GetUser() user: any) {
		return this.authService.checkAuthStatus(user);
	}
}
