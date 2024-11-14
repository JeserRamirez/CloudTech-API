import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { applicant } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateInscriptionPaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class InscriptionService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }
  async createApplicantInscription(
    user: applicant
  ) {
    try {
      const inscription =
        await this.prisma.applicant_payment_inscription.findFirst({
          where: { applicant_id: user.applicant_id },
        });

      
      if (inscription) {
        throw new BadRequestException(
          'You have already applied for a inscription',
        );
      }

      console.log('ok');
      const fee = await this.prisma.fees.findFirst({
        where: {
          AND: [
            {
              period: { name: user.period },
              fee_type: 'inscripcion',
            },
          ],
        },
      });

      if (!fee) {
        throw new InternalServerErrorException(
          'No se encontró el costo de la inscripcion para el período actual',
        );
      }
      
      console.log({fee});
      const totalAmount =
        Number(fee.amount) - (Number(fee.amount) / 100) * Number(fee.discount);

      const { examn_applicant } = await this.prisma.applicant_payment_token.findFirst({
        where: {
          applicant_id: user.applicant_id,
        },
        select: {
          examn_applicant: {
            select: {
              id_examn_applicant: true,
              examn_status: true,
            }
          }
        }
      });

      console.log({examn_applicant});
      if (examn_applicant.length === 0) {
        throw new NotFoundException(
          'No se encontró informacion del examen del aplicante',
        );
      };

      const {id_examn_applicant, examn_status} = examn_applicant[0];

      if (examn_status === false) {
        throw new BadRequestException(
          'No se puede crear la solicitud de inscripcion, ya que no se ha aprobado el examen',
        );
      };

      console.log('ok');


      const createInfo = await this.prisma.applicant_payment_inscription.create({
        data: {
          state: 'pendiente',

          total_amount_to_pay: totalAmount.toFixed(2),
          payment_status: false,
          payment_method: '',
          reference_number: '',

          fees: {
            connect: {
              id: fee.id,
            },
          },
          examn_applicant: {
            connect: {
              id_examn_applicant: id_examn_applicant
            },
          },
          applicant: {
            connect: {
              applicant_id: user.applicant_id,
            },
          },
        }
      });

      console.log('ok');
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }
      this.handleDBErrors(error);
    }
  }

  async updatePaymentMethod(
    user: applicant,
    updateInscriptionPaymentMethodDto: UpdateInscriptionPaymentMethodDto,
  ){
    try {

      const {applicant_payment_inscription} = await this.prisma.applicant.findFirst({
        where: { applicant_id: user.applicant_id},
        select: { applicant_payment_inscription: {
          select: { id_payment_inscription: true}
        }}
      });

      if(!applicant_payment_inscription) {
        throw new NotFoundException(
          'No se encontró la inscripción para el solicitante.',
        );
      };

      const fee = await this.prisma.fees.findFirst({
				where: {
					AND: [
						{
							period: { name: user.period },
							fee_type: 'inscripcion',
						},
					],
				},
			});

      console.log(fee);

      if (fee.deadline < new Date()) {
				throw new BadRequestException(
					'El plazo de pago para la solicitud de incripcion ha expirado',
				);
			}
      
      const totalAmount =
				Number(fee.amount) - (Number(fee.amount) / 100) * Number(fee.discount);


      const {id_payment_inscription} = applicant_payment_inscription[0];


      await this.prisma.applicant_payment_inscription.update({
        where: { 
          id_payment_inscription: id_payment_inscription,
        },
        data: {
          total_amount_to_pay: totalAmount,
          payment_method: updateInscriptionPaymentMethodDto.payment_method,
          reference_number: updateInscriptionPaymentMethodDto.reference_number,
          updated_at: new Date(),
        },
      });


    // Retornar un mensaje de éxito
    return { message: 'Método de pago actualizado exitosamente.' };

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      this.handleDBErrors(error);
    }
  }
  async updateChangePaymentStatus(user: applicant) {
    try {
      const { applicant_payment_inscription } = await this.prisma.applicant.findUnique({
        where: { applicant_id: user.applicant_id },
        select: {
          applicant_payment_inscription: {
            select: {
              id_payment_inscription: true,
              payment_status: true,
              fees: true,
            },
          },
        },
      });

      if (!applicant_payment_inscription) {
        throw new NotFoundException(
          'No se encontró la inscripción para el solicitante.',
        );
      }

      const [token] = applicant_payment_inscription;
      const { id_payment_inscription, payment_status, fees } = token;
      const totalAmount = Number(fees.amount) - 
        (Number(fees.amount) / 100) * Number(fees.discount);

      await this.prisma.applicant_payment_inscription.update({
        where: { id_payment_inscription },
        data: {
          total_amount_to_pay: totalAmount.toFixed(2),
          updated_at: new Date(),
        },
      });

      if (payment_status === true) {

        // Obtener todos los tokens generados, ignorando los que tengan pre_application_token en null
			const tokens = await this.prisma.applicant_payment_inscription.findMany({
				orderBy: { inscription_token: 'asc' },
				select: { inscription_token: true },
			});

			// Filtrar los tokens no nulos y convertirlos a números
			const validTokens = tokens
				.map((token) => parseInt(token.inscription_token))
				.filter((token) => !isNaN(token));

			console.log(validTokens);

			// Generar el nuevo token incrementando el máximo valor existente o comenzando desde 1
			const newToken =
				validTokens.length > 0 ? Math.max(...validTokens) + 1 : 1;

			// Formatear el token a un número de 4 dígitos (e.g., 0384)
			const formattedToken = newToken.toString().padStart(4, '0');

        await this.prisma.applicant_payment_inscription.update({
          where: { id_payment_inscription },
          data: {
            inscription_token: formattedToken,
            state: 'completado',
            payment_status: true,
            updated_at: new Date(),
          }
        });
      } else {
        throw new BadRequestException(`No se a procesado el pago de la inscripcion`);
      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      this.handleDBErrors(error);
    }
  }

  async getInscriptonData(user: applicant){
    try {
      const payment_token_inscription = await this.prisma.applicant.findUnique({
        where: {applicant_id: user.applicant_id},
        select:{ 
          applicant_payment_token: {
            select: {
              folio: true,
              career: true,
              career_model: true,
            }
          },
          applicant_payment_inscription: {
            where: {applicant_id: user.applicant_id},
            select: {
              inscription_request_date: true,
              fees: {
                where: { 
                  AND: [{ 
                    period: { name: user.period }, 
                    fee_type: 'inscripcion' 
                  }] 
                },
                select: {
                  deadline: true,
                  amount: true,
                  discount: true,
                },
              },
              state: true,
              total_amount_to_pay: true,
              payment_method: true,
              reference_number: true,
            }
          }
        }
      });

      if (!payment_token_inscription) {
        throw new NotFoundException('No se encontró información de la solicitud de inscripción');
      }

      return payment_token_inscription;
      
    } catch (error) {
      if (
				error instanceof NotFoundException
			) {
				throw error;
			}
      this.handleDBErrors(error);
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
