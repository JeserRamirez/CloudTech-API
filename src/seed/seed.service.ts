import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class SeedService {

    constructor(private readonly prisma: PrismaService) { }



    async seedDatabase() {
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


            const teacher = await this.prisma.teacher.create({
                data: {
                    teacher_number: faker.number.int({ min: 60101101, max: 80230254 }).toString(),
                    hashed_password: faker.internet.password(), // Contraseña generada
                    is_active: faker.datatype.boolean(), // Estado activo aleatorio
                    roles: ['TEACHER'], // Rol fijo o aleatorio
                    period: generatePeriod(), // Genera un periodo aleatorio
                },
            });

            // const connectTeacherPersonalData = await this.prisma.teacher_personal_data.create({
            //     data: {
            //         teacher: {
            //             connect: { teacher_id: teacher.teacher_id }, // Conectar con el teacher recién creado
            //         }
            //     },
            // });

            // const teacherPersonalData = await this.prisma.teacher_personal_data.create({
            //     data: {
            //        // id_teacher_number: faker.number.int({ min: 10101101, max: 20230254 }).toString(),
            //         firstname: faker.person.firstName(), // Nombre
            //         lastname: faker.person.lastName(), // Apellido
            //         street_name: faker.location.street(), // Nombre de calle
            //         street_number: faker.location.buildingNumber(), // Número de calle
            //         city: faker.location.city(), // Ciudad
            //         cp: faker.location.zipCode(), // Código postal
            //         personal_email: faker.internet.email(), // Email personal
            //         schoolar_email: faker.internet.email(), // Email escolar
            //     },
            // });

            // const connectTeacherNumberData = await this.prisma.teacher.update({
            //     data: {
            //         teacher_personal_data: {
            //             connect: { id_teacher_number: teacherPersonalData.id_teacher_number }, // Conectar con el teacher recién creado
            //         }
            //     },
            //     where: undefined
            // });

        }






        return 'Database  seeded successfully!';
    }
}