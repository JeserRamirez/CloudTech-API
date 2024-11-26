import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetGroupsDto } from './dto/findGroups.dto';

interface Grade {
  curse_following_grades_themes_id: number;
  grade: number | null;
  student_current_class: {
    class_schedule: {
      group: {
        group_type: string;
      };
      subject_plan_relation: {
        subject: {
          subject_name: string;
          syllabus: string;
        };
      };
    };
  };
}

type GroupedGrades = Record<string, Grade[]>; // Clave: Nombre de materia, Valor: Lista de calificaciones para esa materia


@Injectable()
export class ScheduleService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }


  async getGroups(user: student, getGroupsDto: GetGroupsDto) {
    try {
      // Validar que el DTO tenga el semestre
      if (!getGroupsDto.semester) {
        throw new BadRequestException({ message: 'El semestre es requerido' });
      }
  
      // Obtener información del estudiante
      const _data = await this.prisma.student.findFirst({
        where: {
          AND: [{ student_id: user.student_id }, { is_active: user.is_active }],
        },
        select: {
          general_data: {
            select: {
              student_kardex_plan: {
                select: {
                  study_plan: {
                    select: {
                      id_study_plan: true,
                      id_carrer: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
  
      // Verificar si existe información del estudiante
      if (!_data || !_data.general_data.length || !_data.general_data[0].student_kardex_plan.length) {
        throw new NotFoundException({ message: 'No se encontró información del estudiante' });
      }
  
      // Extraer la clave de estudio
      const accortedKey = _data.general_data[0].student_kardex_plan[0].study_plan;
  
      // Obtener los grupos disponibles
      const groups = await this.prisma.class_schedule.findMany({
        where: {
          AND: [
            {
              student_current_class: {
                some: { student_id: user.student_id },
              },
            },
            {
              group: {
                period: user.period,
              },
            },
            {
              subject_plan_relation: {
                AND: [
                  { semester: getGroupsDto.semester },
                  {
                    study_plan: {
                      AND: [
                        { id_study_plan: accortedKey.id_study_plan },
                        { id_carrer: accortedKey.id_carrer },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
        select: {
          day_of_week: true,
          start_time: true,
          end_time: true,
          subject_plan_relation: {
            select: {
              subject: {
                select: {
                  subject_name: true,
                  syllabus: true,
                },
              },
            },
          },
          group: {
            select: {
              group_type: true,
            },
          },
          teacher: {
            select: {
              teacher_personal_data: {
                select: {
                  firstname: true,
                  lastname: true,
                },
              },
            },
          },
        },
        orderBy: [{ day_of_week: 'asc' }, { start_time: 'asc' }], // Ordenar por día y hora
      });
  
      // Validar si no hay grupos
      if (groups.length === 0) {
        throw new NotFoundException({ message: 'No se encontraron grupos disponibles' });
      }
  
      // Formatear los datos obtenidos
      const formattedGroups = groups.map((group) => ({
        day_of_week: group.day_of_week,
        time: {
          start: group.start_time.toISOString(),
          end: group.end_time.toISOString(),
        },
        subject: {
          name: group.subject_plan_relation.subject.subject_name,
          syllabus: group.subject_plan_relation.subject.syllabus,
        },
        group_type: group.group.group_type,
        teacher: {
          name: `${group.teacher.teacher_personal_data.firstname} ${group.teacher.teacher_personal_data.lastname}`,
        },
      }));
  
      // Agrupar los datos por `day_of_week`
      const groupedData = formattedGroups.reduce<Record<string, typeof formattedGroups>>((acc, current) => {
        const day = current.day_of_week;
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(current);
        return acc;
      }, {});
      
      // Transformar la salida en un arreglo ordenado por día
      const groupedAndFormatted = Object.entries(groupedData).map(([dayOfWeek, groupData]) => ({
        dayOfWeek,
        schedules: groupData.sort(
          (a, b) => new Date(a.time.start).getTime() - new Date(b.time.start).getTime()
        ),
      }));
      
  
      return {
        period: user.period,
        semester: getGroupsDto.semester,
        groups: groupedAndFormatted,
      };
    } catch (error) {
      // Manejo de errores con detalles
      console.error('Error en getGroups:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException({ message: 'Error al obtener los grupos disponibles' });
    }
  }
  
  

  async getSchedule(user: student) {
    try {
      // Obtener datos del horario
      const schedule = await this.prisma.class_schedule.findMany({
        where: {
          student_current_class: { some: { student_id: user.student_id } },
        },
        select: {
          id_class_schedule: true,
          day_of_week: true,
          start_time: true,
          end_time: true,
          class_room: {
            select: {
              id_class_room: true,
              room_number: true,
            },
          },
          teacher: {
            select: {
              teacher_personal_data: {
                select: {
                  firstname: true,
                  lastname: true,
                },
              },
            },
          },
          subject_plan_relation: {
            select: {
              subject: {
                select: {
                  subject_name: true,
                },
              },
            },
          },
        },
        orderBy: [{ day_of_week: 'asc' }, { start_time: 'asc' }], // Ordenar por día y luego por hora de inicio
      });
  
      // Validar si el horario está vacío
      if (schedule.length === 0) {
        throw new NotFoundException('No se encontró información del horario');
      }
  
      // Limpieza y formateo de los datos
      const cleanScheduleData = schedule.map((item) => ({
        id: item.id_class_schedule,
        dayOfWeek: item.day_of_week,
        time: {
          start: item.start_time.toISOString(),
          end: item.end_time.toISOString(),
        },
        classRoom: item.class_room
          ? { id: item.class_room.id_class_room, number: item.class_room.room_number }
          : { error: 'No se encontró información de salón' },
        teacher: item.teacher?.teacher_personal_data
          ? {
              name: `${item.teacher.teacher_personal_data.firstname} ${item.teacher.teacher_personal_data.lastname}`,
            }
          : { error: 'No se encontró información del maestro' },
        subject: item.subject_plan_relation?.subject?.subject_name || 'No se encontró información de la materia',
      }));
  
      // Agrupar por `dayOfWeek`
      const groupedSchedule = cleanScheduleData.reduce((acc, current) => {
        const day = current.dayOfWeek;
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(current);
        return acc;
      }, {});
  
      // Ordenar los grupos por `startTime` dentro de cada día
      for (const day in groupedSchedule) {
        groupedSchedule[day].sort((a, b) => new Date(a.time.start).getTime() - new Date(b.time.start).getTime());
      }
  
      // Transformar la salida en un arreglo en lugar de objeto, si es necesario
      const formattedSchedule = Object.entries(groupedSchedule).map(([dayOfWeek, schedules]) => ({
        dayOfWeek,
        schedules,
      }));
  
      return formattedSchedule;
    } catch (error) {
      // Manejo de errores
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleDBErrors(error); // Método personalizado para manejar errores
    }
  }
  


  async getGrades(user: student) {
    try {
      // Consulta principal con Prisma
      const grades = await this.prisma.grades_current.findMany({
        where: {
          student_current_class: {
            student: {
              student_id: user.student_id,
            },
          },
        },
        select: {
          curse_following_grades_themes_id: true, // tema al que se le relaciona
          grade: true, // Calificación del tema
          student_current_class: {
            select: {
              class_schedule: {
                select: {
                  group: {
                    select: {
                      group_type: true,
                    }
                  },
                  subject_plan_relation: {
                    select: {
                      subject: {
                        select: {
                          subject_name: true, // Nombre de la materia
                          syllabus: true, // Clave de la materia
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: { grade: 'asc' }
      });

      // Validación de resultados
      if (!grades || grades.length === 0) {
        throw new NotFoundException('No se encontraron calificaciones para el estudiante.');
      }


      // Aquí pegas el código para procesar y limpiar los datos
      // Agrupar por materia con tipado explícito
      const groupedGrades: GroupedGrades = grades.reduce((acc, grade) => {
        const subjectName = grade.student_current_class.class_schedule.subject_plan_relation.subject.subject_name;

        if (!acc[subjectName]) {
          acc[subjectName] = []; // Si no existe el grupo, inicialízalo como un array vacío
        }

        acc[subjectName].push(grade); // Añade la calificación al grupo correspondiente
        return acc;
      }, {} as GroupedGrades);

      // Limpieza de los datos obtenidos
      const cleanGrades = Object.entries(groupedGrades).flatMap(([subject, grades]) =>
        grades.map((grade, index) => ({
          clave: `${grade.student_current_class.class_schedule.subject_plan_relation.subject.syllabus}${grade.student_current_class.class_schedule.group.group_type}`,
          subject: subject,
          id_theme: grade.curse_following_grades_themes_id,
          theme: index + 1, // Index dentro del grupo
          grade: grade.grade ?? `calificación aún no disponible`,
        }))
      );

      return cleanGrades; // Devolver los datos limpios y estructurados
    } catch (error) {
      console.error(error); // Registro del error
      // Manejo de errores
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener las calificaciones del estudiante.');
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code == 'P2002')
      throw new BadRequestException('There already exists a record');

    if (error.code == 'P2025') {
      throw new NotFoundException('There is no record with that userId');
    }

    console.log(error.code);
    throw new InternalServerErrorException('Please check server logs');
  }


}
