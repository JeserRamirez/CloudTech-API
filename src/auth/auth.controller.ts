import { Body, Controller, Get, Patch, Post, UsePipes } from '@nestjs/common';

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
import { ValidRoles } from './interfaces';
import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { TrimPipe } from 'src/common/pipes';

@ApiTags('Auth')
@SkipThrottle({ short: false, medium: true, large: true })
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	// Register and login of Applicant
	@ApiBody({
		description: 'Datos del solicitante para registrarse',
		schema: {
			example: {
				applicant: {
					curp: 'RAEJ020717HVZMSSA2',
					password: 'MachoMen2002',
				},
				student_personal_data: {
					firstname: 'Jeser',
					lastname: 'Ramirez Estrada',
					birthdate: '2002-07-17',
					street_name: 'Callejon Vidal Diaz Muñoz',
					street_number: '7',
					city: 'Acayucan',
					cp: '96039',
					phone: '+52 9241966858',
					personal_email: 'jeserramirezestrada@gmail.com',
					civil_status: 'SOLTERO',
					laboral_status: 'DESEMPLEADO',
					rfc: '02519617814',
				},
				last_study_level: {
					provenance_school_name:
						'Centro de Bachillerato Tecnologico Industrial y de Servicios No. 48',
					provenance_state: 'Veracruz',
					provenence_city: 'Acayucan',
					graduation_date: '2020-07-12',
					graduation_score: '90',
					area: 'Laboratorista Quimico',
				},
				preventive_data: {
					id_nss: '17170203123',
					clinic: '32',
					blood_type: 'O+',
					allergies: 'NINGUNA',
					disability: 'NINGUNA',
					psychological_problems: 'NINGUNO',
				},
				student_tutor_data: {
					firstname: 'Jeser',
					lastname: 'Ramirez Estrada',
					street_name: 'Callejon Vidal Diaz Muñoz',
					street_number: '7',
					city: 'Acayucan',
					cp: '96039',
					personal_email: 'jeserramirezestrada@gmail.com',
					phone: '+529241966858',
					workplace: 'estudiante',
				},
			},
		},
	})
	@Post('register-applicant')
	@UsePipes(new TrimPipe())
	createApplicant(
		@Body('applicant') createApplicantDto: CreateApplicantDto,
		@Body('student_personal_data')
		createStudentPersonalDataDto: CreateStudentPersonalDataDto,
		@Body('last_study_level')
		createLastStudyLevelDto: CreateLastStudyLevelDto,
		@Body('preventive_data')
		createPreventiveDataDto: CreatePreventiveDataDto,
		@Body('student_tutor_data')
		createStudentTutorDataDto: CreateStudentTutorDataDto,
	) {
		console.log(createApplicantDto);
		return this.authService.createApplicant(
			createApplicantDto,
			createStudentPersonalDataDto,
			createLastStudyLevelDto,
			createPreventiveDataDto,
			createStudentTutorDataDto,
		);
	}

	@Post('login-applicant')
	@UsePipes(new TrimPipe())
	loginApplicant(@Body() loginApplicantDto: LoginApplicantDto) {
		return this.authService.loginApplicant(loginApplicantDto);
	}

	@Post('register-student')
	@UsePipes(new TrimPipe())
	createStudent(@Body() createStudentDto: CreateStudentDto) {
		return this.authService.createStudent(createStudentDto);
	}

	@Post('login-student')
	@UsePipes(new TrimPipe())
	loginStudent(@Body() loginStudentDto: LoginStudentDto) {
		return this.authService.loginStudent(loginStudentDto);
	}
	@Post('register-teacher')
	@UsePipes(new TrimPipe())
	createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
		return this.authService.createTeacher(createTeacherDto);
	}
	@Post('login-teacher')
	@UsePipes(new TrimPipe())
	loginTeacher(@Body() loginTeacherDto: LoginTeacherDto) {
		return this.authService.loginTeacher(loginTeacherDto);
	}

	@Patch('change-password')
	@Auth(ValidRoles.applicant, ValidRoles.student, ValidRoles.teacher)
	async changePassword(
		@GetUser() user: any,
		@Body() changePasswordDto: ChangePasswordDto,
	) {
		return this.authService.changePassword(user, changePasswordDto);
	}

	@Post('forgot-password')
	async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
		return this.authService.forgotPassword(forgotPasswordDto);
	}

	@Patch('reset-password')
	async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
		return this.authService.resetPassword(resetPasswordDto);
	}

	@Post('logout')
	@Auth(ValidRoles.applicant, ValidRoles.student, ValidRoles.teacher)
	async logout(@GetUser() user: any) {
		console.log(user);
		await this.authService.logout(user);
		return { message: 'Logged out successfully!!' };
	}

	@Get('check-auth-status')
	@Auth(ValidRoles.applicant)
	CheckAuthStatus(@GetUser() user: any) {
		return this.authService.checkAuthStatus(user);
	}
}
