import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';
import { applicant } from '@prisma/client';


@Injectable()
export class SeedService {

    constructor(private readonly prisma: PrismaService) { }



    async seedDatabase() {
        const generateSimpleCURP = (): string => {
            return faker.string.alpha({ length: 18, casing: 'upper' }); // Genera 18 letras mayúsculas aleatorias
        };

        const currentYear = new Date().getFullYear(); // Captura el año actual

        const generatePeriod = (): string => {
            const period = faker.helpers.arrayElement([
                `enero-junio ${currentYear}`,
                `agosto-diciembre ${currentYear}`
            ]);

            return period;
        };

        //await this.prisma.applicant.deleteMany(); 
        await this.prisma.$executeRaw`TRUNCATE TABLE "applicant" RESTART IDENTITY CASCADE;`;

        const usersToCreate = 50; // Cantidad de usuarios a generar

        for (let i = 0; i < usersToCreate; i++) {
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
                    // Aquí agrega otros campos necesarios para general_data
                },
            });
















            // // Generar datos de estudiante
            // const student = await this.prisma.student.create({
            //     data: {
            //         control_number: faker.database.mongodbObjectId(),
            //         hashed_password: faker.internet.password(),
            //         is_active: faker.datatype.boolean(),
            //         roles: ['STUDENT'],
            //         period: generatePeriod(),
            //     },
            // });

        }
        return 'Database seeded successfully!';
    }
}