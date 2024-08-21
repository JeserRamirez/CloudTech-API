import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
	CreateApplicantDto,
	CreateStudentDto,
	CreateTeacherDto,
	LoginApplicantDto,
} from './dto';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { LoginStudentDto } from './dto/login_student.dto';
import { ValidRoles } from './interfaces';

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

	// Register and login of Student
	@Post('register-student')
	createStudent(@Body() createStudentDto: CreateStudentDto) {
		return this.authService.createStudent(createStudentDto);
	}
	@Post('login-student')
	loginStudent(@Body() loginStudentDto: LoginStudentDto) {
		return this.authService.loginStudent(loginStudentDto);
	}

	// // Register and login of Teacher
	// @Post('register-teacher')
	// createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
	// 	return this.authService.createTeacher(createTeacherDto);
	// }

	@Get('check-auth-status')
	@Auth(ValidRoles.applicant)
	CheckAuthStatus(@GetUser() user: any) {
		return this.authService.checkAuthStatus(user);
	}
}
