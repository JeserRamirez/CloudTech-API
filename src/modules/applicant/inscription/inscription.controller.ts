import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { applicant } from '@prisma/client';
import { UpdateInscriptionPaymentMethodDto } from './dto/update-payment-method.dto';
import { ValidRoles } from 'src/auth/interfaces';
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Applicant Inscription Data')
@SkipThrottle({ short: true, medium: false, large: true })
@Controller('applicant/inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) { }

  @Post('request')
  @ApiResponse({
    status: 201,
    description: 'La solicitud de inscripción fue creada exitosamente.',
    schema: {
      example: {
        message: 'La solicitud de inscripción fue creada exitosamente',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Errores relacionados con el cliente.',
    schema: {
      anyOf: [
        { example: { statusCode: 400, message: 'Ya has solicitado un registro de inscripción', error: 'Bad Request' } },
        { example: { statusCode: 400, message: 'No se puede crear la solicitud de inscripción, ya que no se ha aprobado el examen', error: 'Bad Request' } },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Recurso no encontrado.',
    schema: {
      anyOf: [
        { example: { statusCode: 404, message: 'No se encontró el costo de la inscripción para el período actual', error: 'Not Found' } },
        { example: { statusCode: 404, message: 'No se encontró información del examen del aplicante', error: 'Not Found' } },
      ],
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Ocurrió un error inesperado.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Ocurrió un error inesperado.',
        error: 'Internal Server Error',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'El usuario no está autorizado para acceder al recurso.' })
  @Auth(ValidRoles.applicant)
  async createPaymentInscription(@GetUser() user: applicant) {
    return this.inscriptionService.createApplicantInscription(user);
  }

  @Get()
  @ApiOkResponse({
    content: {
      'application/json': {
        example: {
          applicant_payment_token: {
            folio: '0001',
            career: 'Ing. en Sistemas',
            career_model: 'Maestría en Ingeniería de Software',
          },
          applicant_payment_inscription: {
            inscription_request_date: '2022-10-12T04:35:22.151Z',
            fees: [
              {
                deadline: '2022-12-12T04:35:22.151Z',
                amount: 100,
                discount: 0,
              },
            ],
            state: 'pendiente',
            total_amount_to_pay: 100,
            payment_method: 'SPEI',
            reference_number: '9834 5672 9854 2146',
          }
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Recurso no encontrado.',
    schema: {
      anyOf: [
        { example: { statusCode: 404, message: 'No se encontró información de la solicitud de inscripción', error: 'Not Found' } },
      ],
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Ocurrió un error inesperado.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Ocurrió un error inesperado.',
        error: 'Internal Server Error',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'El usuario no está autorizado para acceder al recurso.' })
  @Auth(ValidRoles.applicant)
  async getPaymentInscription(@GetUser() user: applicant) {
    return this.inscriptionService.getInscriptonData(user);
  }

  @Patch('request')
  @ApiResponse({
    status: 200,
    description: 'El método de pago fue actualizado exitosamente.',
    schema: {
      example: {
        message: 'El método de pago fue actualizado exitosamente',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Errores relacionados con el cliente.',
    schema: {
      anyOf: [
        { example: { statusCode: 400, message: 'El plazo de pago para la solicitud de incripcion ha expirado', error: 'Bad Request' } },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Recurso no encontrado.',
    schema: {
      anyOf: [
        { example: { statusCode: 404, message: 'No se encontró la inscripción para el solicitante', error: 'Not Found' } },
      ],
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Ocurrió un error inesperado.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Ocurrió un error inesperado.',
        error: 'Internal Server Error',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'El usuario no está autorizado para acceder al recurso.' })
  @ApiBody({
    description: 'Datos para actualizar el método de pago',
    schema: {
      example: {
        payment_method: 'SPEI',
        reference_number: '9834 5672 9854 2146',
      },
    },
  })
  @Auth(ValidRoles.applicant)
  async updateInscriptionPaymentMethod(
    @GetUser() user: applicant,
    @Body() updateInscriptionPaymentMethodDto: UpdateInscriptionPaymentMethodDto
  ) {
    return await this.inscriptionService.updatePaymentMethod(
      user,
      updateInscriptionPaymentMethodDto
    );
  }

  @Patch('init_status-change')
  @ApiOperation({
		summary: 'Actualizar el status a completado y el total a pagar.',
		description:
			'Esta ruta esta pensada para usarse al renderizar el componente por primera vez, valida si el status ha sido cambiado a true en la base de datos.',
	})
  @ApiResponse({
    status: 200,
    description: 'El Status de pago fue actualizado exitosamente.',
    schema: {
      example: {
        message: 'El Status de pago fue actualizado exitosamente',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Errores relacionados con el cliente.',
    schema: {
      anyOf: [
        { example: { statusCode: 400, message: 'No se a procesado el pago de la inscripcion', error: 'Bad Request' } },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Recurso no encontrado.',
    schema: {
      anyOf: [
        { example: { statusCode: 404, message: 'No se encontró la inscripción para el solicitante', error: 'Not Found' } },
      ],
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Ocurrió un error inesperado.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Ocurrió un error inesperado.',
        error: 'Internal Server Error',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'El usuario no está autorizado para acceder al recurso.' })
  @Auth(ValidRoles.applicant)
  async updateInscriptionPaymentChange(@GetUser() user: applicant) {
    return await this.inscriptionService.updateChangePaymentStatus(user);
  }


}
