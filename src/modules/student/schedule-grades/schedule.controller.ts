import { Controller, Get, Body } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { student } from '@prisma/client';
import { GetGroupsDto } from './dto/findGroups.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Student Schedule and Grades')
@Controller('student/schedule-grades')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) { }

  @Get('schedule')
  @Auth(ValidRoles.student)
  @ApiResponse({
    status: 200,
    description: 'Horario del estudiante obtenido con éxito',
    schema: {
      example: [
        {
          dayOfWeek: 'Monday',
          schedules: [
            {
              id: 1,
              time: { start: '08:00:00', end: '09:30:00' },
              classRoom: { id: 101, number: 'A1' },
              teacher: { name: 'John Doe' },
              subject: 'Mathematics',
            },
          ],
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: 'No se encontró información del horario' })
  async findSchedule(@GetUser() user: student) {
    return await this.scheduleService.getSchedule(user);
  }

  @Get('grades')
  @Auth(ValidRoles.student)
  @ApiResponse({
    status: 200,
    description: 'Calificaciones del estudiante obtenidas con éxito',
    schema: {
      example: {
        semester: 1,
        grades: [
          {
            subject: 'Mathematics',
            grade: 95,
            percentage: 20,
          },
        ],
        average: 85,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'No se encontró información de las calificaciones' })
  async findGrades(@GetUser() user: student) {
    return await this.scheduleService.getGrades(user);
  }

  @Get('groups')
  @Auth(ValidRoles.student)
  @ApiBody({
    description: 'Información requerida para obtener los grupos disponibles',
    schema: {
      example: {
        semester: 3,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Grupos obtenidos con éxito',
    schema: {
      example: {
        period: '2024-2',
        semester: 3,
        groups: [
          {
            day_of_week: 'Monday',
            start_time: '08:00:00',
            end_time: '09:30:00',
            subject: { name: 'Mathematics', syllabus: 'Basic concepts of Algebra' },
            group_type: 'A',
            teacher: { name: 'John Doe' },
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 400, description: 'El semestre es requerido' })
  @ApiResponse({ status: 404, description: 'No se encontró información del estudiante' })
  async findGroupsBySemester(
    @GetUser() user: student,
    @Body() getGroupsDto: GetGroupsDto,
  ) {
    return await this.scheduleService.getGroups(user, getGroupsDto);
  }
}
