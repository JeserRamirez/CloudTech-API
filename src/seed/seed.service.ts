import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class SeedService {

    constructor(private readonly prisma: PrismaService) { }



    async seedDatabase() {

        await this.prisma.$executeRaw`TRUNCATE TABLE "carrer" RESTART IDENTITY CASCADE;`;
        await this.prisma.$executeRaw`TRUNCATE TABLE "group" RESTART IDENTITY CASCADE;`;
        await this.prisma.$executeRaw`TRUNCATE TABLE "class_room" RESTART IDENTITY CASCADE;`;
        await this.prisma.$executeRaw`TRUNCATE TABLE "class_schedule" RESTART IDENTITY CASCADE;`;
        await this.prisma.$executeRaw`TRUNCATE TABLE "complementary_activity" RESTART IDENTITY CASCADE;`;
        const carreras = await this.prisma.carrer.createMany({
            data: [
                { carrer_name: 'Ingeniería en Sistemas Computacionales', modality: 'Escolarizado' },
                { carrer_name: 'Licenciatura en Administración de Empresas', modality: 'Escolarizado' },
                { carrer_name: 'Licenciatura en Derecho', modality: 'Escolarizado' },
                { carrer_name: 'Ingeniería Industrial', modality: 'Escolarizado' },
                { carrer_name: 'Ingeniería Industrial', modality: 'A distancia' },
                { carrer_name: 'Licenciatura en Contaduría Pública', modality: 'Escolarizado' },
                { carrer_name: 'Ingeniería en Energías Renovables', modality: 'Escolarizado' },
                { carrer_name: 'Licenciatura en Psicología', modality: 'Escolarizado' },
                { carrer_name: 'Ingeniería Mecatrónica', modality: 'Escolarizado' },
                { carrer_name: 'Licenciatura en Mercadotecnia', modality: 'Escolarizado' },
                { carrer_name: 'Licenciatura en Pedagogía', modality: 'Escolarizado' },
            ],
            skipDuplicates: true, // Evita duplicados si ya existen
        });

        const subjectPlans = await this.prisma.subject_plan.createMany({
            data: [
                { id_carrer: 1, name: 'Plan de estudios - Ingeniería en Sistemas Computacionales', modality: 'Presencial' },
                { id_carrer: 2, name: 'Plan de estudios - Administración de Empresas', modality: 'Presencial' },
                { id_carrer: 3, name: 'Plan de estudios - Derecho', modality: 'Presencial' },
                { id_carrer: 4, name: 'Plan de estudios - Ingeniería Industrial', modality: 'Presencial' },
                { id_carrer: 5, name: 'Plan de estudios - Contaduría Pública', modality: 'Presencial' },
                { id_carrer: 6, name: 'Plan de estudios - Energías Renovables', modality: 'Presencial' },
                { id_carrer: 7, name: 'Plan de estudios - Psicología', modality: 'Presencial' },
                { id_carrer: 8, name: 'Plan de estudios - Mecatrónica', modality: 'Presencial' },
                { id_carrer: 9, name: 'Plan de estudios - Mercadotecnia', modality: 'Presencial' },
                { id_carrer: 10, name: 'Plan de estudios - Pedagogía', modality: 'Presencial' },
            ],
            skipDuplicates: true, // Evita duplicados si ya existen
        });

        const subjects = await this.prisma.subject.createMany({
            data: [
                { subject_name: 'Matemáticas I', theoretical_hours: '3', practical_hours: 2, credits: 5, syllabus: ['1', '2', '3'] },
                { subject_name: 'Física I', theoretical_hours: '2', practical_hours: 3, credits: 5, syllabus: ['4', '5', '6'] },
                { subject_name: 'Introducción a la Programación', theoretical_hours: '4', practical_hours: 2, credits: 6, syllabus: ['7', '8', '9'] },
                { subject_name: 'Contabilidad Básica', theoretical_hours: '3', practical_hours: 1, credits: 4, syllabus: ['10', '11', '12'] },
                { subject_name: 'Derecho Constitucional', theoretical_hours: '2', practical_hours: 2, credits: 4, syllabus: ['13', '14', '15'] },
                { subject_name: 'Cálculo Diferencial', theoretical_hours: '3', practical_hours: 2, credits: 5, syllabus: ['16', '17', '18'] },
                { subject_name: 'Química General', theoretical_hours: '2', practical_hours: 3, credits: 5, syllabus: ['19', '20', '21'] },
                { subject_name: 'Psicología del Desarrollo', theoretical_hours: '3', practical_hours: 1, credits: 4, syllabus: ['22', '23', '24'] },
                { subject_name: 'Mercadotecnia Básica', theoretical_hours: '2', practical_hours: 2, credits: 4, syllabus: ['25', '26', '27'] },
                { subject_name: 'Introducción a la Pedagogía', theoretical_hours: '3', practical_hours: 1, credits: 4, syllabus: ['28', '29', '30'] },
            ],
            skipDuplicates: true, // Evita duplicados
        });


        const specialities = await this.prisma.specialities.createMany({
            data: [
                { carrer_id: 1, speciality_name: 'Ingeniería en Software', duration: 8 },
                { carrer_id: 2, speciality_name: 'Contabilidad Fiscal', duration: 6 },
                { carrer_id: 3, speciality_name: 'Derecho Penal', duration: 7 },
                { carrer_id: 4, speciality_name: 'Diseño Gráfico Digital', duration: 6 },
                { carrer_id: 5, speciality_name: 'Marketing Digital', duration: 6 },
                { carrer_id: 6, speciality_name: 'Pedagogía Infantil', duration: 7 },
                { carrer_id: 7, speciality_name: 'Química Industrial', duration: 8 },
                { carrer_id: 8, speciality_name: 'Ingeniería Ambiental', duration: 8 },
                { carrer_id: 9, speciality_name: 'Psicología Clínica', duration: 7 },
                { carrer_id: 10, speciality_name: 'Física Aplicada', duration: 8 },
            ],
            skipDuplicates: true, // Evita duplicados
        });


        const subjectPlanRelations = await this.prisma.subject_plan_relation.createMany({
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

        const specialitySubjectPlans = await this.prisma.speciality_subject_plan.createMany({
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
        await this.prisma.$executeRaw`TRUNCATE TABLE "applicant" RESTART IDENTITY CASCADE;`;
        await this.prisma.$executeRaw`TRUNCATE TABLE "student" RESTART IDENTITY CASCADE;`;


        const usersToCreate = 50; // Cantidad de usuarios a generar

        for (let i = 0; i < usersToCreate; i++) {



            const currentYear = faker.date.between({ from: '2021-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' }).getFullYear().toString(); // Obtiene el año de una fecha aleatoria

            const generatePeriod = (): string => {
                const period = faker.helpers.arrayElement([
                    `enero-junio ${currentYear}`,
                    `agosto-diciembre ${currentYear}`
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
                    blood_type: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']), // Tipo de sangre aleatorio
                    allergies: faker.lorem.words(3), // Generar alergias aleatorias
                    disability: faker.lorem.word(), // Palabra aleatoria para discapacidad
                    psychological_problems: faker.lorem.sentence(), // Oración aleatoria para problemas psicológicos
                },
            });

            const studentPersonalData = await this.prisma.student_personal_data.create({
                data: {
                    firstname: faker.person.firstName(),
                    lastname: faker.person.lastName(),
                    birthdate: faker.date.birthdate(), // Por ejemplo, para asegurar que sea mayor de 18 años
                    curp: generateSimpleCURP(),
                    street_name: faker.location.street(),
                    street_number: faker.location.buildingNumber(),
                    city: faker.location.city(),
                    cp: faker.location.zipCode(),
                    phone: faker.phone.number(),
                    personal_email: faker.internet.email(),
                    schoolar_email: faker.internet.email(),
                    civil_status: faker.helpers.arrayElement(['Soltero', 'Casado', 'Divorciado']),
                    laboral_status: faker.helpers.arrayElement(['Empleado', 'Desempleado']),
                    rfc: faker.database.mongodbObjectId(), // RFC puede ser una combinación de caracteres
                },
            });

            const studentTutorData = await this.prisma.student_tutor_data.create({
                data: {
                    firstname: faker.person.firstName(),
                    lastname: faker.person.lastName(),
                    street_name: faker.location.street(),
                    street_number: faker.location.buildingNumber(),
                    city: faker.location.city(),
                    cp: faker.location.zipCode(),
                    personal_email: faker.internet.email(),
                    phone: faker.phone.number(),
                    workplace: faker.company.name(), // Genera un nombre de empresa para el lugar de trabajo
                },
            });

            const scholarData = await this.prisma.scholar_data.create({
                data: {
                    school_prev: faker.company.name(),
                    graduation_period: generatePeriod(),
                    validate_periods: faker.datatype.boolean(),
                    current_period: generatePeriod(),
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
                    area: faker.helpers.arrayElement(['Ciencias', 'Artes', 'Tecnología', 'Humanidades', 'Deportes']), // Selección aleatoria de un área de estudio
                },
            });

            if (faker.datatype.boolean) {
                // Generar datos de estudiante
                const student = await this.prisma.student.create({
                    data: {
                        control_number: faker.number.int({ min: 10101101, max: 20230254 }).toString(),
                        hashed_password: faker.internet.password(),
                        is_active: faker.datatype.boolean(),
                        roles: ['STUDENT'],
                        period: generatePeriod(),
                    },
                });

                const studentKardexPlan = await this.prisma.student_kardex_plan.create({
                    data: {
                        //   general_data_id: generalDataId, // Ensure this is linked to an existing student
                        subject_plan_relation_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
                        id_plan_relation: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
                        complete: faker.datatype.boolean(),
                        end_semester: faker.number.int({ min: 1, max: 12 }), // Assuming a typical 8-semester program
                    },
                });

                const connectStudentCurrentStatus = await this.prisma.student_current_status.create({
                    data: {
                        student: {
                            connect: {
                                student_id: student.student_id, // Conectar con el applicant recién creado
                            },
                        },
                    },
                });

                const studentCurrentStatus = await this.prisma.student_current_status.update({
                    where: { id_status: connectStudentCurrentStatus.id_status },
                    data: {
                        // student_id: faker.number.int({ min: 1, max: 1000 }), // ID de estudiante aleatorio
                        carrer_id: faker.number.int({ min: 1, max: 10 }), // ID de carrera aleatorio
                        general_average: faker.number.float({ min: 6.0, max: 10.0 }).toFixed(2).toString(), // Promedio general aleatorio con 2 decimales
                        completed_subjects: faker.number.int({ min: 10, max: 50 }), // Número de materias completadas aleatorias
                        current_subjects: faker.number.int({ min: 1, max: 50 }), // Número de materias actuales aleatorias
                        accumulated_credits: faker.number.int({ min: 20, max: 300 }), // Créditos acumulados aleatorios
                    },
                });







                // Crear datos generales asociados al applicant
                const generalData = await this.prisma.general_data.create({
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
                                id_student_personal_data: studentPersonalData.id_student_personal_data, // Conectar con el applicant recién creado
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
            const generalData = await this.prisma.general_data.create({
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
                            id_student_personal_data: studentPersonalData.id_student_personal_data, // Conectar con el applicant recién creado
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



        }



        await this.prisma.$executeRaw`TRUNCATE TABLE "teacher" RESTART IDENTITY CASCADE;`;

        const teachersToCreate = usersToCreate / 2; // Cantidad de usuarios a generar

        for (let i = 0; i < teachersToCreate; i++) {

            const currentYear = faker.date.between({ from: '2021-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' }).getFullYear().toString(); // Obtiene el año de una fecha aleatoria

            const generatePeriod = (): string => {
                const period = faker.helpers.arrayElement([
                    `enero-junio ${currentYear}`,
                    `agosto-diciembre ${currentYear}`
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
                    id_class_room: faker.number.int({ min: 80101101, max: 90230254 }).toString(),
                    room_number: faker.number.int({ min: 1, max: 11 }), // Número de aula aleatorio entre 1 y 11
                    capacity: faker.number.int({ min: 10, max: 50 }), // Capacidad de aula entre 10 y 50
                },
            });



            const teacher = await this.prisma.teacher.create({
                data: {
                    teacher_number: faker.number.int({ min: 60101101, max: 80230254 }).toString(),
                    hashed_password: faker.internet.password(), // Contraseña generada
                    is_active: faker.datatype.boolean(), // Estado activo aleatorio
                    roles: ['TEACHER'], // Rol fijo o aleatorio
                    period: generatePeriod(), // Genera un periodo aleatorio
                },
            });

            const connectTeacherPersonalData = await this.prisma.teacher_personal_data.create({
                data: {
                    teacher: {
                        connect: { teacher_id: teacher.teacher_id }, // Conectar con el teacher recién creado
                    }
                },
            });

            const teacherPersonalData = await this.prisma.teacher_personal_data.update({
                where: { id_teacher_number: connectTeacherPersonalData.id_teacher_number },
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
                    }
                },
            });

            const jobData = await this.prisma.job_data.update({
                where: { id_job_data: connect_job_data.id_job_data },
                data: {
                    //   id_teacher_number: teacherNumber, // Ensure this is linked to an existing teacher
                    plaza: faker.helpers.arrayElement(['20hrs', '18hrs', '12hrs', '8hrs']),
                    degree: faker.helpers.arrayElement(['Bachillerato', 'Maestria', 'Asociado']),
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
                        'Servicios Escolares']),
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

            const classSchedule = await this.prisma.class_schedule.update({
                where: { id_class_schedule: connectClass.id_class_schedule },

                data: {
                    subject_plan_relation_id: faker.number.int({ min: 1, max: 10 }), // ID de relación de plan de asignatura aleatorio
                    day_of_week: faker.helpers.arrayElement(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']), // Día de la semana aleatorio
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
                    const connectComplementary = await this.prisma.complementary_activity.create({
                        data: {
                            teacher: {
                                connect: { teacher_id: teacher.teacher_id },
                            },
                        },
                    });

                    const complementaryActivity = await this.prisma.complementary_activity.update({
                        where: { id_complementary: connectComplementary.id_complementary },
                        data: {
                            activity_name: faker.helpers.arrayElement(['Taller de Liderazgo',
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
                                'Programa de Intercambio Cultural',]), // Asignamos la actividad actual del array
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

        const currentYear = faker.date.between({ from: '2021-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' }).getFullYear().toString(); // Obtiene el año de una fecha aleatoria

        const generatePeriod = (): string => {
            const period = faker.helpers.arrayElement([
                `enero-junio ${currentYear}`,
                `agosto-diciembre ${currentYear}`
            ]);

            return period;
        };
        const students = await this.prisma.student.findMany({
            take: 50,  // Limita la búsqueda a los primeros 10 estudiantes
        });

        const complementaryActivities = await this.prisma.complementary_activity.findMany();

        if (complementaryActivities.length === 0) {
            throw new Error('No complementary activities found in the database.');
        }

        for (const student of students) {
            // Selecciona una actividad complementaria aleatoria
            const activity = faker.helpers.arrayElement(complementaryActivities);

            // Verifica si la actividad existe antes de hacer la asignación
            const activityExists = await this.prisma.complementary_activity.findUnique({
                where: { id_complementary: activity.id_complementary },
            });

            if (!activityExists) {
                throw new Error(`Activity with id ${activity.id_complementary} does not exist.`);
            }

            await this.prisma.student_complementary_activities.create({
                data: {
                    student_id: student.student_id,  // ID del estudiante
                    complementary_activity_id: activity.id_complementary,  // ID de la actividad complementaria
                    status: faker.helpers.arrayElements(['En progreso', 'Completado', 'Incompleto']),
                    period: generatePeriod(),  // Periodo de la actividad
                },
            });
        }






        return 'Database  seeded successfully!';
    }
}