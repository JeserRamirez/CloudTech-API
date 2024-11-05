import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeedService {
	constructor(private readonly prisma: PrismaService) {}

	async seedDatabase() {
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "applicant" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "student" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "general_data" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "preventive_data" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "student_personal_data" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "student_tutor_data" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "scholar_data" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "last_study_Level" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "session" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "teacher" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "teacher_personal_data" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "job_data" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "profile_picture" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "applicant_payment_token" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "examn_applicant" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "applicant_payment_inscription" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "carrer" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "subject_plan" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "subject" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "specialities" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "speciality_subject_plan" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "subject_plan_relation" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "student_kardex_plan" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "student_current_class" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "group" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "group_tags" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "class_room" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "class_schedule" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "initial_data_subject" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "general_data_subject" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "general_competence_edit" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "assing_data_subject" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "assing_initial_data_subject" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "assing_general_data_subject" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "curse_following_grades_themes" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "grades_current" RESTART IDENTITY CASCADE;`;

		await this.prisma.carrer.createMany({
			data: [
				{
					carrer_name: 'Ingeniería en Sistemas Computacionales',
					modality: 'Escolarizado',
				},
				{
					carrer_name: 'Licenciatura en Administración de Empresas',
					modality: 'Escolarizado',
				},
				{ carrer_name: 'Licenciatura en Derecho', modality: 'Escolarizado' },
				{ carrer_name: 'Ingeniería Industrial', modality: 'Escolarizado' },
				{ carrer_name: 'Ingeniería Industrial', modality: 'A distancia' },
				{
					carrer_name: 'Licenciatura en Contaduría Pública',
					modality: 'Escolarizado',
				},
				{
					carrer_name: 'Ingeniería en Energías Renovables',
					modality: 'Escolarizado',
				},
				{ carrer_name: 'Licenciatura en Psicología', modality: 'Escolarizado' },
				{ carrer_name: 'Ingeniería Mecatrónica', modality: 'Escolarizado' },
				{
					carrer_name: 'Licenciatura en Mercadotecnia',
					modality: 'Escolarizado',
				},
				{ carrer_name: 'Licenciatura en Pedagogía', modality: 'Escolarizado' },
			],
			skipDuplicates: true, // Evita duplicados si ya existen
		});

		await this.prisma.subject_plan.createMany({
			data: [
				{
					id_carrer: 1,
					name: 'Plan de estudios - Ingeniería en Sistemas Computacionales',
					modality: 'Presencial',
				},
				{
					id_carrer: 2,
					name: 'Plan de estudios - Administración de Empresas',
					modality: 'Presencial',
				},
				{
					id_carrer: 3,
					name: 'Plan de estudios - Derecho',
					modality: 'Presencial',
				},
				{
					id_carrer: 4,
					name: 'Plan de estudios - Ingeniería Industrial',
					modality: 'Presencial',
				},
				{
					id_carrer: 5,
					name: 'Plan de estudios - Contaduría Pública',
					modality: 'Presencial',
				},
				{
					id_carrer: 6,
					name: 'Plan de estudios - Energías Renovables',
					modality: 'Presencial',
				},
				{
					id_carrer: 7,
					name: 'Plan de estudios - Psicología',
					modality: 'Presencial',
				},
				{
					id_carrer: 8,
					name: 'Plan de estudios - Mecatrónica',
					modality: 'Presencial',
				},
				{
					id_carrer: 9,
					name: 'Plan de estudios - Mercadotecnia',
					modality: 'Presencial',
				},
				{
					id_carrer: 10,
					name: 'Plan de estudios - Pedagogía',
					modality: 'Presencial',
				},
			],
			skipDuplicates: true, // Evita duplicados si ya existen
		});

		await this.prisma.subject.createMany({
			data: [
				{
					subject_name: 'Matemáticas I',
					theoretical_hours: '3',
					practical_hours: 2,
					credits: 5,
					syllabus: ['1', '2', '3'],
				},
				{
					subject_name: 'Física I',
					theoretical_hours: '2',
					practical_hours: 3,
					credits: 5,
					syllabus: ['4', '5', '6'],
				},
				{
					subject_name: 'Introducción a la Programación',
					theoretical_hours: '4',
					practical_hours: 2,
					credits: 6,
					syllabus: ['7', '8', '9'],
				},
				{
					subject_name: 'Contabilidad Básica',
					theoretical_hours: '3',
					practical_hours: 1,
					credits: 4,
					syllabus: ['10', '11', '12'],
				},
				{
					subject_name: 'Derecho Constitucional',
					theoretical_hours: '2',
					practical_hours: 2,
					credits: 4,
					syllabus: ['13', '14', '15'],
				},
				{
					subject_name: 'Cálculo Diferencial',
					theoretical_hours: '3',
					practical_hours: 2,
					credits: 5,
					syllabus: ['16', '17', '18'],
				},
				{
					subject_name: 'Química General',
					theoretical_hours: '2',
					practical_hours: 3,
					credits: 5,
					syllabus: ['19', '20', '21'],
				},
				{
					subject_name: 'Psicología del Desarrollo',
					theoretical_hours: '3',
					practical_hours: 1,
					credits: 4,
					syllabus: ['22', '23', '24'],
				},
				{
					subject_name: 'Mercadotecnia Básica',
					theoretical_hours: '2',
					practical_hours: 2,
					credits: 4,
					syllabus: ['25', '26', '27'],
				},
				{
					subject_name: 'Introducción a la Pedagogía',
					theoretical_hours: '3',
					practical_hours: 1,
					credits: 4,
					syllabus: ['28', '29', '30'],
				},
			],
			skipDuplicates: true, // Evita duplicados
		});

		await this.prisma.specialities.createMany({
			data: [
				{
					carrer_id: 1,
					speciality_name: 'Ingeniería en Software',
					duration: 8,
				},
				{ carrer_id: 2, speciality_name: 'Contabilidad Fiscal', duration: 6 },
				{ carrer_id: 3, speciality_name: 'Derecho Penal', duration: 7 },
				{
					carrer_id: 4,
					speciality_name: 'Diseño Gráfico Digital',
					duration: 6,
				},
				{ carrer_id: 5, speciality_name: 'Marketing Digital', duration: 6 },
				{ carrer_id: 6, speciality_name: 'Pedagogía Infantil', duration: 7 },
				{ carrer_id: 7, speciality_name: 'Química Industrial', duration: 8 },
				{ carrer_id: 8, speciality_name: 'Ingeniería Ambiental', duration: 8 },
				{ carrer_id: 9, speciality_name: 'Psicología Clínica', duration: 7 },
				{ carrer_id: 10, speciality_name: 'Física Aplicada', duration: 8 },
			],
			skipDuplicates: true, // Evita duplicados
		});

		await this.prisma.subject_plan_relation.createMany({
			data: [
				{ id_subject_plan: 1, id_subject: 1, semester: 1 },
				{ id_subject_plan: 1, id_subject: 2, semester: 2 },
				{ id_subject_plan: 2, id_subject: 3, semester: 1 },
				{ id_subject_plan: 2, id_subject: 4, semester: 2 },
				{ id_subject_plan: 3, id_subject: 5, semester: 3 },
				{ id_subject_plan: 3, id_subject: 6, semester: 4 },
				{ id_subject_plan: 4, id_subject: 7, semester: 1 },
				{ id_subject_plan: 5, id_subject: 8, semester: 2 },
				{ id_subject_plan: 6, id_subject: 9, semester: 3 },
				{ id_subject_plan: 7, id_subject: 10, semester: 4 },
			],
			skipDuplicates: true, // Evita duplicados
		});

		await this.prisma.speciality_subject_plan.createMany({
			data: [
				{ specialities_id: 1, subject_plan_relation_id: 1 }, // Ingeniería en Sistemas con Plan 1
				{ specialities_id: 1, subject_plan_relation_id: 2 }, // Ingeniería en Sistemas con Plan 2
				{ specialities_id: 2, subject_plan_relation_id: 1 }, // Ingeniería en Software con Plan 1
				{ specialities_id: 2, subject_plan_relation_id: 3 }, // Ingeniería en Software con Plan 3
				{ specialities_id: 3, subject_plan_relation_id: 1 }, // Administración de Empresas con Plan 1
				{ specialities_id: 4, subject_plan_relation_id: 2 }, // Contaduría Pública con Plan 2
				{ specialities_id: 5, subject_plan_relation_id: 3 }, // Diseño Gráfico con Plan 3
				{ specialities_id: 6, subject_plan_relation_id: 1 }, // Psicología con Plan 1
				{ specialities_id: 7, subject_plan_relation_id: 2 }, // Derecho con Plan 2
				{ specialities_id: 8, subject_plan_relation_id: 1 }, // Arquitectura con Plan 1
				{ specialities_id: 9, subject_plan_relation_id: 3 }, // Ingeniería Industrial con Plan 3
				{ specialities_id: 10, subject_plan_relation_id: 2 }, // Mercadotecnia con Plan 2
			],
			skipDuplicates: true, // Evita duplicados
		});

		const generateSimpleCURP = (): string => {
			return faker.string.alpha({ length: 18, casing: 'upper' }); // Genera 18 letras mayúsculas aleatorias
		};

		//await this.prisma.applicant.deleteMany();
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "applicant" RESTART IDENTITY CASCADE;`;
		await this.prisma
			.$executeRaw`TRUNCATE TABLE "student" RESTART IDENTITY CASCADE;`;

		const usersToCreate = 50; // Cantidad de usuarios a generar

		for (let i = 0; i < usersToCreate; i++) {
			const currentYear = faker.date
				.between({
					from: '2021-01-01T00:00:00.000Z',
					to: '2025-01-01T00:00:00.000Z',
				})
				.getFullYear()
				.toString(); // Obtiene el año de una fecha aleatoria

			const generatePeriod = (): string => {
				const period = faker.helpers.arrayElement([
					`enero-junio ${currentYear}`,
					`agosto-diciembre ${currentYear}`,
				]);

				return period;
			};
			// Generar datos de usuario
			const applicant = await this.prisma.applicant.create({
				data: {
					curp: generateSimpleCURP(),
					hashed_password: faker.internet.password(),
					is_active: faker.datatype.boolean(),
					roles: ['APPLICANT'],
					period: generatePeriod(),
				},
			});

			// Crear datos preventivos asociados al applicant
			const preventiveData = await this.prisma.preventive_data.create({
				data: {
					id_nss: faker.database.mongodbObjectId(), // Generar un NSS aleatorio
					clinic: faker.company.name(), // Nombre de clínica aleatorio
					blood_type: faker.helpers.arrayElement([
						'A+',
						'A-',
						'B+',
						'B-',
						'O+',
						'O-',
						'AB+',
						'AB-',
					]), // Tipo de sangre aleatorio
					allergies: faker.lorem.words(3), // Generar alergias aleatorias
					disability: faker.lorem.word(), // Palabra aleatoria para discapacidad
					psychological_problems: faker.lorem.sentence(), // Oración aleatoria para problemas psicológicos
				},
			});

			const studentPersonalData =
				await this.prisma.student_personal_data.create({
					data: {
						firstname: faker.person.firstName(),
						lastname: faker.person.lastName(),
						birthdate: faker.date.birthdate(), // Por ejemplo, para asegurar que sea mayor de 18 años
						curp: generateSimpleCURP(),
						street_name: faker.location.street(),
						street_number: faker.location.buildingNumber(),
						// city: faker.location.city(),
						cp: faker.location.zipCode(),
						personal_email: faker.internet.email(),
						schoolar_email: faker.internet.email(),
						civil_status: faker.helpers.arrayElement([
							'Soltero',
							'Casado',
							'Divorciado',
						]),
						laboral_status: faker.helpers.arrayElement([
							'Empleado',
							'Desempleado',
						]),
						rfc: faker.database.mongodbObjectId(), // RFC puede ser una combinación de caracteres
						state_of_birth: faker.location.state(), // Estado de nacimiento
						state: faker.location.state(), // Estado
						municipality_of_birth: faker.location.city(), // Municipio de nacimiento
						home_phone: faker.phone.number(), // Teléfono de domicilio
						mobile_phone: faker.phone.number(), // Teléfono celular
						neighborhood: faker.location.direction(), // Colonia
						company: faker.company.name(), // Empresa (opcional)
					},
				});

			const studentTutorData = await this.prisma.student_tutor_data.create({
				data: {
					firstname: faker.person.firstName(),
					lastname: faker.person.lastName(),
					street_name: faker.location.street(),
					street_number: faker.location.buildingNumber(),
					state: faker.location.state(), // Estado
					neighborhood: faker.location.direction(), // Colonia
					home_phone: faker.phone.number(), // Teléfono de domicilio
					mobile_phone: faker.phone.number(), // Teléfono celular
					cp: faker.location.zipCode(),
					personal_email: faker.internet.email(),
					rfc: faker.database.mongodbObjectId(), // RFC puede ser una combinación de caracteres
					workplace: faker.company.name(), // Empresa
				},
			});

			const scholarData = await this.prisma.scholar_data.create({
				data: {
					school_prev: faker.company.name(),
					graduation_period: generatePeriod(),
					validate_periods: faker.datatype.boolean(),
					current_period: generatePeriod(),
					admission_period: generatePeriod(),
					accumulated_credits: faker.number.int({ min: 0, max: 300 }),
					status: faker.helpers.arrayElement(['Activo', 'Inactivo']),
				},
			});

			const lastStudyLevel = await this.prisma.last_study_Level.create({
				data: {
					provenance_school_name: faker.company.name(), // Nombre aleatorio de la escuela de procedencia
					provenance_state: faker.location.state(), // Estado aleatorio de la dirección
					provenence_city: faker.location.city(), // Ciudad aleatoria de la dirección
					graduation_date: faker.date.past({ years: 10 }), // Fecha de graduación aleatoria en los últimos 5 años
					graduation_score: faker.number.float({ min: 7, max: 10 }).toFixed(2), // Promedio de graduación entre 7.00 y 10.00
					area: faker.helpers.arrayElement([
						'Ciencias',
						'Artes',
						'Tecnología',
						'Humanidades',
						'Deportes',
					]), // Selección aleatoria de un área de estudio
				},
			});

			if (faker.datatype.boolean) {
				// Generar datos de estudiante
				const student = await this.prisma.student.create({
					data: {
						control_number: faker.number
							.int({ min: 10101101, max: 20230254 })
							.toString(),
						hashed_password: faker.internet.password(),
						is_active: faker.datatype.boolean(),
						roles: ['STUDENT'],
						period: generatePeriod(),
					},
				});

				const studentKardexPlan = await this.prisma.student_kardex_plan.create({
					data: {
						//   general_data_id: generalDataId, // Ensure this is linked to an existing student
						subject_plan_relation_id: faker.helpers.arrayElement([
							1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
						]),
						id_plan_relation: faker.helpers.arrayElement([
							1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
						]),
						complete: faker.datatype.boolean(),
						end_semester: faker.number.int({ min: 1, max: 12 }), // Assuming a typical 8-semester program
					},
				});

				const connectStudentCurrentStatus =
					await this.prisma.student_current_status.create({
						data: {
							student: {
								connect: {
									student_id: student.student_id, // Conectar con el applicant recién creado
								},
							},
						},
					});

				await this.prisma.student_current_status.update({
					where: { id_status: connectStudentCurrentStatus.id_status },
					data: {
						// student_id: faker.number.int({ min: 1, max: 1000 }), // ID de estudiante aleatorio
						carrer_id: faker.number.int({ min: 1, max: 10 }), // ID de carrera aleatorio
						general_average: faker.number
							.float({ min: 6.0, max: 10.0 })
							.toFixed(2)
							.toString(), // Promedio general aleatorio con 2 decimales
						completed_subjects: faker.number.int({ min: 10, max: 50 }), // Número de materias completadas aleatorias
						current_subjects: faker.number.int({ min: 1, max: 50 }), // Número de materias actuales aleatorias
						accumulated_credits: faker.number.int({ min: 20, max: 300 }), // Créditos acumulados aleatorios
					},
				});

				// Crear datos generales asociados al applicant
				await this.prisma.general_data.create({
					data: {
						applicant: {
							connect: {
								applicant_id: applicant.applicant_id, // Conectar con el applicant recién creado
							},
						},

						preventive_data: {
							connect: {
								id_preventive_data: preventiveData.id_preventive_data, // Conectar con el applicant recién creado
							},
						},

						student_personal_data: {
							connect: {
								id_student_personal_data:
									studentPersonalData.id_student_personal_data, // Conectar con el applicant recién creado
							},
						},

						student_tutor_data: {
							connect: {
								id_student_tutor_data: studentTutorData.id_student_tutor_data, // Conectar con el applicant recién creado
							},
						},

						scholar_data: {
							connect: {
								id_scholar_data: scholarData.id_scholar_data, // Conectar con el applicant recién creado
							},
						},

						last_study_Level: {
							connect: {
								id_last_study_Level: lastStudyLevel.id_last_study_Level, // Conectar con el applicant recién creado
							},
						},

						student: {
							connect: {
								student_id: student.student_id, // Conectar con el applicant recién creado
							},
						},
						student_kardex_plan: {
							connect: {
								id_kardex: studentKardexPlan.id_kardex, // Conectar con el applicant recién creado
							},
						},
						// Aquí agrega otros campos necesarios para general_data
					},
				});
			}

			// Crear datos generales asociados al applicant
			await this.prisma.general_data.create({
				data: {
					applicant: {
						connect: {
							applicant_id: applicant.applicant_id, // Conectar con el applicant recién creado
						},
					},

					preventive_data: {
						connect: {
							id_preventive_data: preventiveData.id_preventive_data, // Conectar con el applicant recién creado
						},
					},

					student_personal_data: {
						connect: {
							id_student_personal_data:
								studentPersonalData.id_student_personal_data, // Conectar con el applicant recién creado
						},
					},

					student_tutor_data: {
						connect: {
							id_student_tutor_data: studentTutorData.id_student_tutor_data, // Conectar con el applicant recién creado
						},
					},

					scholar_data: {
						connect: {
							id_scholar_data: scholarData.id_scholar_data, // Conectar con el applicant recién creado
						},
					},

					last_study_Level: {
						connect: {
							id_last_study_Level: lastStudyLevel.id_last_study_Level, // Conectar con el applicant recién creado
						},
					},
					// Aquí agrega otros campos necesarios para general_data
				},
			});

			const connectAplicantPayment =
				await this.prisma.applicant_payment_token.create({
					data: {
						applicant: {
							connect: { applicant_id: applicant.applicant_id }, // Conectar con el teacher recién creado
						},
					},
				});

			// await this.prisma.applicant_payment_token.update({
			// 	where: {
			// 		id_payment_token: connectAplicantPayment.id_payment_token,
			// 	},
			// 	data: {
			// 		//   applicant_id: applicant.applicant_id, // ID del solicitante
			// 		payment_data: {
			// 			// Datos de pago aleatorios
			// 			amount: faker.number.int({ min: 500, max: 5000 }), // Cantidad de pago aleatoria
			// 			method: faker.helpers.arrayElement([
			// 				'Credit Card',
			// 				'Bank Transfer',
			// 				'PayPal',
			// 			]), // Método de pago aleatorio
			// 			date: faker.date.past(), // Fecha de pago aleatoria
			// 		},
			// 		payment_status: faker.datatype.boolean(), // Estado de pago (true = pagado, false = no pagado)
			// 	},
			// });

			const connectExamAplicant = await this.prisma.examn_applicant.create({
				data: {
					exam_date: faker.date.soon({
						days: faker.number.int({ min: 30, max: 90 }),
					}), // Fecha de examen en los próximos 30 a 90 días
					examn_status: faker.datatype.boolean(),
					applicant_payment_token: {
						connect: {
							id_payment_token: connectAplicantPayment.id_payment_token,
						}, // Conectar con el teacher recién creado
					},
				},
			});

			await this.prisma.applicant_payment_inscription.create({
				data: {
					payment_data: faker.date.soon({
						days: faker.number.int({ min: 30, max: 90 }),
					}), // Fecha de examen en los próximos 30 a 90 días
					payment_status: faker.datatype.boolean(),
					applicant: {
						connect: { applicant_id: applicant.applicant_id }, // Conectar con el teacher recién creado
					},
					examn_applicant: {
						connect: {
							id_examn_applicant: connectExamAplicant.id_examn_applicant,
						}, // Conectar con el teacher recién creado
					},
				},
			});
		}

		const teachersToCreate = 10; // Cantidad de usuarios a generar

		for (let i = 0; i < teachersToCreate; i++) {
			const currentYear = faker.date
				.between({
					from: '2021-01-01T00:00:00.000Z',
					to: '2025-01-01T00:00:00.000Z',
				})
				.getFullYear()
				.toString(); // Obtiene el año de una fecha aleatoria

			const generatePeriod = (): string => {
				const period = faker.helpers.arrayElement([
					`enero-junio ${currentYear}`,
					`agosto-diciembre ${currentYear}`,
				]);

				return period;
			};

			const careers = [
				'Ingeniería en Sistemas Computacionales',
				'Licenciatura en Administración de Empresas',
				'Licenciatura en Derecho',
				'Ingeniería Industrial',
				'Licenciatura en Contaduría Pública',
				'Ingeniería en Energías Renovables',
				'Licenciatura en Psicología',
				'Ingeniería Mecatrónica',
				'Licenciatura en Mercadotecnia',
				'Licenciatura en Pedagogía',
			];

			const groupType = faker.helpers.arrayElement(['A', 'B']);
			const group = await this.prisma.group.create({
				data: {
					group_type: groupType === 'A' ? ['B'] : ['A'], // Elegir tipo de grupo
					semester: faker.number.int({ min: 1, max: 12 }), // Suponiendo un programa típico de 12 semestres
					period: generatePeriod(), // Asumiendo que tienes una función para generar el periodo
					group_tags: {
						create: {
							tag: faker.helpers.arrayElement(careers), // Elegir una carrera aleatoriamente
						},
					},
				},
			});

			// Crear el nuevo registro de aula
			const classRoom = await this.prisma.class_room.create({
				data: {
					id_class_room: faker.number
						.int({ min: 80101101, max: 90230254 })
						.toString(),
					room_number: faker.number.int({ min: 1, max: 11 }), // Número de aula aleatorio entre 1 y 11
					capacity: faker.number.int({ min: 10, max: 50 }), // Capacidad de aula entre 10 y 50
				},
			});

			const teacher = await this.prisma.teacher.create({
				data: {
					teacher_number: faker.number
						.int({ min: 60101101, max: 80230254 })
						.toString(),
					hashed_password: faker.internet.password(), // Contraseña generada
					is_active: faker.datatype.boolean(), // Estado activo aleatorio
					roles: ['TEACHER'], // Rol fijo o aleatorio
					period: generatePeriod(), // Genera un periodo aleatorio
				},
			});

			const connectTeacherPersonalData =
				await this.prisma.teacher_personal_data.create({
					data: {
						teacher: {
							connect: { teacher_id: teacher.teacher_id }, // Conectar con el teacher recién creado
						},
					},
				});

			await this.prisma.teacher_personal_data.update({
				where: {
					id_teacher_number: connectTeacherPersonalData.id_teacher_number,
				},
				data: {
					// id_teacher_number: faker.number.int({ min: 10101101, max: 20230254 }).toString(),
					firstname: faker.person.firstName(), // Nombre
					lastname: faker.person.lastName(), // Apellido
					street_name: faker.location.street(), // Nombre de calle
					street_number: faker.location.buildingNumber(), // Número de calle
					city: faker.location.city(), // Ciudad
					cp: faker.location.zipCode(), // Código postal
					personal_email: faker.internet.email(), // Email personal
					schoolar_email: faker.internet.email(), // Email escolar
				},
			});

			const connect_job_data = await this.prisma.job_data.create({
				data: {
					teacher: {
						connect: { teacher_number: teacher.teacher_number }, // Conectar con el teacher recién creado
					},
				},
			});

			await this.prisma.job_data.update({
				where: { id_job_data: connect_job_data.id_job_data },
				data: {
					//   id_teacher_number: teacherNumber, // Ensure this is linked to an existing teacher
					plaza: faker.helpers.arrayElement([
						'20hrs',
						'18hrs',
						'12hrs',
						'8hrs',
					]),
					degree: faker.helpers.arrayElement([
						'Bachillerato',
						'Maestria',
						'Asociado',
					]),
					entry_date: faker.date.past({ years: 5 }), // Random date from the past 5 years
					department: faker.helpers.arrayElement([
						'Gestión Tecnológica y Vinculación',
						'División de Estudios Profesionales',
						'Actividades Extraescolares',
						'Subdirección Académica',
						'Centro de Información',
						'Desarrollo Académico',
						'Centro de Cómputo',
						'Recursos Humanos',
						'Servicios Escolares',
					]),
				},
			});

			const connectClass = await this.prisma.class_schedule.create({
				data: {
					teacher: {
						connect: { teacher_id: teacher.teacher_id },
					},

					group: {
						connect: { id_group: group.id_group },
					},
					class_room: {
						connect: { id_class_room: classRoom.id_class_room },
					},
				},
			});

			await this.prisma.class_schedule.update({
				where: { id_class_schedule: connectClass.id_class_schedule },

				data: {
					subject_plan_relation_id: faker.number.int({ min: 1, max: 10 }), // ID de relación de plan de asignatura aleatorio
					day_of_week: faker.helpers.arrayElement([
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
					]), // Día de la semana aleatorio
					start_time: faker.date.soon(), // Hora de inicio de clase, fecha cercana
					end_time: faker.date.soon({ days: 1 }), // Hora de fin de clase, puede ser al día siguiente o en la misma fecha
				},
			});

			const activities = [
				'Taller de Liderazgo',
				'Conferencia de Innovación',
				'Seminario de Desarrollo Profesional',
				'Curso de Idiomas',
				'Voluntariado Social',
			];

			for (const activity of activities) {
				if (faker.datatype.boolean()) {
					const connectComplementary =
						await this.prisma.complementary_activity.create({
							data: {
								teacher: {
									connect: { teacher_id: teacher.teacher_id },
								},
							},
						});

					await this.prisma.complementary_activity.update({
						where: {
							id_complementary: connectComplementary.id_complementary,
						},
						data: {
							activity_name: faker.helpers.arrayElement([
								'Taller de Liderazgo',
								'Conferencia de Innovación',
								'Seminario de Desarrollo Profesional',
								'Curso de Idiomas',
								'Voluntariado Social',
								'Curso de Habilidades Técnicas',
								'Entrenamiento en Trabajo en Equipo',
								'Programa de Mentoría',
								'Foro de Emprendimiento',
								'Taller de Gestión del Tiempo',
								'Taller de Presentaciones Efectivas',
								'Simposio de Educación Financiera',
								'Conferencia sobre Salud Mental',
								'Curso de Comunicación Interpersonal',
								'Programa de Intercambio Cultural',
							]), // Asignamos la actividad actual del array
							period: generatePeriod(), // Generamos el periodo de la actividad
							credits: faker.number.int({ min: 1, max: 3 }), // Créditos aleatorios entre 1 y 3
						},
					});
				}
				break;
			}

			// const connectStudentComplementary = await this.prisma.student_complementary_activities.create({
			//     data: {
			//         student: {
			//             connect: {
			//                 student_id: student.student_id, // Conectar con el applicant recién creado
			//             },
			//         },
			//     },
			// });

			// const studentComplementaryActivity = await this.prisma.student_complementary_activities.create({
			//     // where: { id_activity: connectStudentComplementary.id_activity },
			//     data: {
			//         complementary_activity_id: faker.number.int({ min: 1, max: 10 }),
			//         status: faker.helpers.arrayElements(['En progreso', 'Completado', 'Incompleto']),   // Estado inicial, puede ser "In Progress" o "Completed"
			//         period: generatePeriod(),   // Generar el periodo
			//     },
			// });
		}

		const currentYear = faker.date
			.between({
				from: '2021-01-01T00:00:00.000Z',
				to: '2025-01-01T00:00:00.000Z',
			})
			.getFullYear()
			.toString(); // Obtiene el año de una fecha aleatoria

		const generatePeriod = (): string => {
			const period = faker.helpers.arrayElement([
				`enero-junio ${currentYear}`,
				`agosto-diciembre ${currentYear}`,
			]);

			return period;
		};
		const students = await this.prisma.student.findMany({
			take: 50, // Limita la búsqueda a los primeros 10 estudiantes
		});

		const complementaryActivities =
			await this.prisma.complementary_activity.findMany();

		if (complementaryActivities.length === 0) {
			throw new Error('No complementary activities found in the database.');
		}

		for (const student of students) {
			// Selecciona una actividad complementaria aleatoria
			const activity = faker.helpers.arrayElement(complementaryActivities);

			// Verifica si la actividad existe antes de hacer la asignación
			const activityExists =
				await this.prisma.complementary_activity.findUnique({
					where: { id_complementary: activity.id_complementary },
				});

			if (!activityExists) {
				throw new Error(
					`Activity with id ${activity.id_complementary} does not exist.`,
				);
			}

			await this.prisma.student_complementary_activities.create({
				data: {
					student_id: student.student_id, // ID del estudiante
					complementary_activity_id: activity.id_complementary, // ID de la actividad complementaria
					status: faker.helpers.arrayElements([
						'En progreso',
						'Completado',
						'Incompleto',
					]),
					period: generatePeriod(), // Periodo de la actividad
				},
			});
		}

		const subjectPlanRelations1 =
			await this.prisma.subject_plan_relation.findMany({
				take: 10, // Obtiene los primeros 10 registros
			});

		if (subjectPlanRelations1.length === 0) {
			throw new Error('No subject plan relations found in the database.');
		}

		const subjectList = [
			'Matemáticas I',
			'Física I',
			'Introducción a la Programación',
			'Contabilidad Básica',
			'Derecho Constitucional',
			'Cálculo Diferencial',
			'Química General',
			'Psicología del Desarrollo',
			'Mercadotecnia Básica',
			'Introducción a la Pedagogía',
		];

		const competenceList = [
			{
				skill: 'Aplicar conceptos básicos para resolver problemas matemáticos.',
				description:
					'Desarrollar habilidades para análisis y solución de problemas usando fundamentos de álgebra y geometría.',
			},
			{
				skill: 'Entender las leyes fundamentales de la física.',
				description:
					'Aplicar principios físicos para comprender fenómenos naturales y su relación con la ingeniería.',
			},
			{
				skill: 'Desarrollar programas básicos en lenguajes de programación.',
				description:
					'Implementar algoritmos y resolver problemas computacionales mediante lenguajes de programación estructurada.',
			},
			{
				skill: 'Registrar operaciones financieras básicas.',
				description:
					'Realizar el registro de operaciones financieras en libros contables aplicando principios de contabilidad.',
			},
			{
				skill: 'Interpretar los derechos fundamentales de la constitución.',
				description:
					'Aplicar conceptos básicos del derecho constitucional en casos prácticos y cotidianos.',
			},
			{
				skill:
					'Aplicar técnicas de cálculo para resolver problemas matemáticos.',
				description:
					'Resolver problemas de límites, derivadas e integrales en situaciones prácticas.',
			},
			{
				skill: 'Comprender los principios básicos de la química.',
				description:
					'Analizar las propiedades químicas de los elementos y su impacto en la vida diaria y la industria.',
			},
			{
				skill: 'Analizar las etapas del desarrollo humano.',
				description:
					'Comprender los factores que influyen en el desarrollo físico, cognitivo y emocional de los individuos.',
			},
			{
				skill: 'Entender los fundamentos básicos de la mercadotecnia.',
				description:
					'Desarrollar estrategias de marketing para promover productos y servicios en diferentes mercados.',
			},
			{
				skill:
					'Analizar el proceso educativo y los principios de la pedagogía.',
				description:
					'Estudiar las teorías y métodos pedagógicos para mejorar la práctica educativa.',
			},
		];

		for (let i = 0; i < subjectList.length; i++) {
			const createdSubject = await this.prisma.initial_data_subject.create({
				data: {
					characterization: {
						name: subjectList[i],
						description: faker.lorem.sentence(),
					},
					didactics: {
						methods: faker.helpers.arrayElement([
							'Exposición',
							'Discusión',
							'Trabajo en equipo',
						]),
						evaluation: faker.helpers.arrayElement([
							'Exámenes',
							'Proyectos',
							'Participación',
						]),
					},
					competence_specify: {
						skill: competenceList[i].skill,
						description: competenceList[i].description,
					},
				},
			});

			// Asigna la relación de plan de materia
			await this.prisma.subject_plan_relation.update({
				where: {
					id_subject_plan_relation:
						subjectPlanRelations1[i].id_subject_plan_relation,
				},
				data: {
					initial_data_subject: {
						connect: {
							id_initial_data_subject: createdSubject.id_initial_data_subject,
						},
					},
				},
			});

			await this.prisma.general_data_subject.create({
				data: {
					initial_data_subject: {
						connect: {
							id_initial_data_subject: createdSubject.id_initial_data_subject, //
						},
					},
					description_tag: subjectList[i],
				},
			});

			await this.prisma.general_competence_edit.create({
				data: {
					general_data_subject: {
						connect: {
							id_general_data_subject: createdSubject.id_initial_data_subject, //
						},
					},
				},
			});
		}

		const general_competence_edit =
			await this.prisma.general_competence_edit.findMany({
				take: 10, // Obtiene los primeros 10 registros
			});

		if (general_competence_edit.length === 0) {
			throw new Error('No general competence edit found in the database.');
		}
		const generalCompetenceData = [
			{
				description:
					'Aplicar los conceptos fundamentales de las matemáticas en la resolución de problemas cotidianos.',
				topics_and_sub: ['Álgebra', 'Geometría', 'Trigonometría'],
				activities_learning: [
					'Resolución de problemas',
					'Análisis de ecuaciones',
				],
				activities_teaching: ['Clases magistrales', 'Ejercicios prácticos'],
				competence_generic: 'Desarrollar pensamiento lógico y crítico.',
			},
			{
				description:
					'Entender y aplicar los principios básicos de la física en fenómenos naturales.',
				topics_and_sub: ['Cinemática', 'Dinámica', 'Fuerzas'],
				activities_learning: ['Simulaciones', 'Pruebas experimentales'],
				activities_teaching: ['Talleres prácticos', 'Demostraciones'],
				competence_generic: 'Capacidad para aplicar el método científico.',
			},
			{
				description:
					'Desarrollar programas básicos y aplicar lógica de programación estructurada.',
				topics_and_sub: ['Algoritmos', 'Estructuras de control', 'Funciones'],
				activities_learning: [
					'Desarrollo de algoritmos',
					'Escritura de código',
				],
				activities_teaching: [
					'Laboratorios de programación',
					'Evaluaciones de proyectos',
				],
				competence_generic:
					'Capacidad para resolver problemas computacionales.',
			},
			{
				description: 'Registrar y analizar operaciones contables básicas.',
				topics_and_sub: ['Activos', 'Pasivos', 'Capital'],
				activities_learning: [
					'Análisis de estados financieros',
					'Elaboración de balances',
				],
				activities_teaching: ['Exposiciones teóricas', 'Ejercicios prácticos'],
				competence_generic:
					'Capacidad para gestionar información financiera básica.',
			},
			{
				description:
					'Interpretar los principios de la constitución y su impacto en la sociedad.',
				topics_and_sub: [
					'Derechos fundamentales',
					'División de poderes',
					'Normas jurídicas',
				],
				activities_learning: ['Análisis de casos', 'Debates legales'],
				activities_teaching: [
					'Lectura de textos jurídicos',
					'Discusiones dirigidas',
				],
				competence_generic:
					'Capacidad para aplicar principios constitucionales.',
			},
			{
				description:
					'Aplicar los principios de cálculo diferencial en la solución de problemas matemáticos.',
				topics_and_sub: ['Límites', 'Derivadas', 'Integrales'],
				activities_learning: [
					'Resolución de ecuaciones',
					'Aplicaciones prácticas',
				],
				activities_teaching: ['Exámenes teóricos', 'Problemas prácticos'],
				competence_generic: 'Habilidad en el uso de técnicas de cálculo.',
			},
			{
				description:
					'Entender los conceptos básicos de la química y sus aplicaciones.',
				topics_and_sub: [
					'Elementos químicos',
					'Compuestos',
					'Reacciones químicas',
				],
				activities_learning: ['Laboratorios químicos', 'Ejercicios prácticos'],
				activities_teaching: ['Exposiciones', 'Pruebas experimentales'],
				competence_generic: 'Capacidad para realizar análisis químicos.',
			},
			{
				description:
					'Analizar el desarrollo humano desde el punto de vista psicológico.',
				topics_and_sub: [
					'Crecimiento cognitivo',
					'Desarrollo emocional',
					'Socialización',
				],
				activities_learning: ['Análisis de casos', 'Simulaciones'],
				activities_teaching: [
					'Clases interactivas',
					'Proyectos de investigación',
				],
				competence_generic: 'Habilidad para comprender el desarrollo humano.',
			},
			{
				description:
					'Desarrollar estrategias de mercadotecnia para productos y servicios.',
				topics_and_sub: [
					'Estrategias de producto',
					'Canales de distribución',
					'Publicidad',
				],
				activities_learning: ['Diseño de campañas', 'Análisis de mercado'],
				activities_teaching: ['Estudios de caso', 'Proyectos prácticos'],
				competence_generic:
					'Capacidad para gestionar proyectos de mercadotecnia.',
			},
			{
				description:
					'Entender las bases de la pedagogía y su aplicación en la educación.',
				topics_and_sub: [
					'Teorías educativas',
					'Métodos de enseñanza',
					'Evaluación',
				],
				activities_learning: [
					'Desarrollo de planes educativos',
					'Simulaciones de clases',
				],
				activities_teaching: ['Clases prácticas', 'Evaluaciones de desempeño'],
				competence_generic: 'Capacidad para diseñar programas educativos.',
			},
		];

		// Inserción en el modelo general_competence_edit
		for (let i = 0; i < subjectList.length; i++) {
			await this.prisma.general_competence_edit.update({
				where: {
					id_general_competence_edit:
						general_competence_edit[i].id_general_competence_edit,
				},
				data: {
					description: {
						general: generalCompetenceData[i].description,
					},
					topics_and_sub: {
						topics: generalCompetenceData[i].topics_and_sub,
					},
					activities_learning: {
						learning_methods: generalCompetenceData[i].activities_learning,
					},
					activities_teaching: {
						teaching_methods: generalCompetenceData[i].activities_teaching,
					},
					competence_generic: {
						generic: generalCompetenceData[i].competence_generic,
					},
					theorical: faker.number.int({ min: 20, max: 40 }), // Horas teóricas
					practice: faker.number.int({ min: 20, max: 40 }), // Horas prácticas
					scope_indicators: {
						indicators: faker.helpers.arrayElements([
							'Dominio conceptual',
							'Capacidad analítica',
						]),
					},
					value_indicator: {
						indicator: faker.helpers.arrayElement([
							'Aprobado',
							'Sobresaliente',
							'Notable',
						]),
					},
					scheduling_tp: {
						week: faker.number.int({ min: 1, max: 15 }), // semanas
					},
					scheduling_tr: {
						week: faker.number.int({ min: 1, max: 15 }), // semanas
					},
				},
			});
		}

		// Recuperamos las tablas por defecto
		const initialDataSubjects = await this.prisma.initial_data_subject.findMany(
			{
				take: 10, // Limitar a las primeras 10 materias
			},
		);

		const generalDataSubjects = await this.prisma.general_data_subject.findMany(
			{
				take: 10, // Limitar a las primeras 10 materias
			},
		);

		const generalCompetenceEdits =
			await this.prisma.general_competence_edit.findMany({
				take: 10, // Limitar a las primeras 10 competencias
			});

		// Creamos las inserciones en las tablas modificables
		for (let i = 0; i < initialDataSubjects.length; i++) {
			const initialSubject = initialDataSubjects[i];
			const generalSubject = generalDataSubjects[i];
			const generalCompetence = generalCompetenceEdits[i];

			// Insertar en assing_initial_data_subject
			const assingInitialDataSubject =
				await this.prisma.assing_initial_data_subject.create({
					data: {
						characterization: initialSubject.characterization,
						didactics: initialSubject.didactics,
						competence_specify: initialSubject.competence_specify,
						subject_plan_relation_id: initialSubject.subject_plan_relation_id,
					},
				});

			// Insertar en assing_general_data_subject
			await this.prisma.assing_general_data_subject.create({
				data: {
					description_tag: generalSubject.description_tag,
				},
			});

			// Insertar en assing_general_competence_edit
			await this.prisma.assing_general_competence_edit.create({
				data: {
					description: generalCompetence.description,
					topics_and_sub: generalCompetence.topics_and_sub,
					activities_learning: generalCompetence.activities_learning,
					activities_teaching: generalCompetence.activities_teaching,
					competence_generic: generalCompetence.competence_generic,
					theorical: generalCompetence.theorical,
					practice: generalCompetence.practice,
					scope_indicators: generalCompetence.scope_indicators,
					value_indicator: generalCompetence.value_indicator,
					scheduling_tp: generalCompetence.scheduling_tp,
					scheduling_tr: generalCompetence.scheduling_tr,
				},
			});

			await this.prisma.assing_general_competence_edit.update({
				where: {
					id_general_competence_edit:
						generalCompetence.id_general_competence_edit,
				},
				data: {
					assing_general_data_subject: {
						connect: {
							id_general_data_subject:
								assingInitialDataSubject.id_initial_data_subject, //
						},
					},
				},
			});

			await this.prisma.curse_following_grades_themes.create({
				data: {
					assing_general_data_subject: {
						connect: {
							id_general_data_subject:
								assingInitialDataSubject.id_initial_data_subject, //
						},
					},
				},
			});

			await this.prisma.assing_initial_data_subject.update({
				where: {
					id_initial_data_subject:
						assingInitialDataSubject.id_initial_data_subject,
				},
				data: {
					assing_general_data_subject: {
						connect: {
							id_general_data_subject:
								assingInitialDataSubject.id_initial_data_subject, //
						},
					},
				},
			});

			await this.prisma.assing_data_subject.create({
				data: {
					initial_data_subject: {
						connect: {
							id_initial_data_subject:
								assingInitialDataSubject.id_initial_data_subject, //
						},
					},
					assing_initial_data_subject: {
						connect: {
							id_initial_data_subject:
								assingInitialDataSubject.id_initial_data_subject, //
						},
					},
				},
			});
		}

		// Creamos la lista de IDs para las class_schedule
		const classScheduleIds = Array.from({ length: 10 }, (_, i) => i + 1); // IDs del 1 al 25

		// Actualizamos cada class_schedule
		for (let i = 0; i < classScheduleIds.length; i++) {
			await this.prisma.class_schedule.update({
				where: {
					id_class_schedule: classScheduleIds[i], // ID de class_schedule actual
				},
				data: {
					assing_data_subject_id: classScheduleIds[i], // Asigna un ID aleatorio entre 1 y 10
				},
			});
		}

		const students2 = await this.prisma.student.findMany({
			take: 50, // Limita la búsqueda a los primeros 50 estudiantes
		});

		const classSchedules = await this.prisma.class_schedule.findMany({
			take: 10, // Obtiene los primeros 10 horarios de clase
		});

		// Verifica que hay horarios de clase disponibles
		if (classSchedules.length === 0) {
			throw new Error('No class schedules found in the database.');
		}

		for (const student of students2) {
			// Selecciona un ID de clase aleatorio
			const randomClassScheduleId =
				faker.helpers.arrayElement(classSchedules).id_class_schedule;

			await this.prisma.student_current_class.create({
				data: {
					class_schedule_id: randomClassScheduleId, // Asigna el ID de horario de clase aleatorio
					student_id: student.student_id, // ID del estudiante
				},
			});
		}

		// Buscar los primeros 50 registros de 'student_current_class'
		const studentCurrentClasses =
			await this.prisma.student_current_class.findMany({
				take: 50, // Limita la búsqueda a los primeros 50 registros
			});

		// Buscar los primeros 10 registros de 'curse_following_grades_themes'
		const curseFollowingGradesThemes =
			await this.prisma.curse_following_grades_themes.findMany({
				take: 10, // Limita la búsqueda a los primeros 10 registros
			});

		if (
			studentCurrentClasses.length === 0 ||
			curseFollowingGradesThemes.length === 0
		) {
			throw new Error('No hay suficientes registros en las tablas necesarias.');
		}

		for (let i = 0; i < studentCurrentClasses.length; i++) {
			const studentClass = studentCurrentClasses[i];

			// Asignar temas de forma cíclica a los estudiantes
			const theme =
				curseFollowingGradesThemes[i % curseFollowingGradesThemes.length]; // Usamos el módulo para repetir los temas

			// Inserta los datos en la tabla 'grades_current' para cada estudiante
			await this.prisma.grades_current.create({
				data: {
					student_current_class_id: studentClass.id_current_class, // ID del registro de 'student_current_class'
					curse_following_grades_themes_id:
						theme.id_curse_following_grades_themes, // ID del tema de curso
					grade: faker.number.int({ min: 50, max: 100 }), // Nota aleatoria entre 50 y 100
					faults: faker.number.int({ min: 0, max: 10 }), // Faltas aleatorias entre 0 y 10
					percentage: faker.number.float({ min: 50, max: 100 }).toFixed(2), // Porcentaje aleatorio con 2 decimales
				},
			});
		}

		return 'Database  seeded successfully!';
	}
}
