import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { carrer, applicant } from '@prisma/client';
import {
	CreatePreApplicationRequestDto,
	UpdatePaymentMethodDto,
	UpdatePreApplicationRequestDto,
} from './dto';
import { removeAttributes } from 'src/common/helpers';

@Injectable()
export class PreApplicationService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllCareers(): Promise<carrer[]> {
		try {
			const careers = await this.prisma.carrer.findMany();

			if (careers.length === 0) {
				throw new NotFoundException(
					'No hay carreras disponibles / para mostrar',
				);
			}
			return careers;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			this.handleDBErrors(error);
		}
	}

	async getPreApplication(user: applicant) {
		try {
			const payment_token = await this.prisma.applicant_payment_token.findFirst(
				{
					where: { applicant_id: user.applicant_id },
					include: { fees: true },
				},
			);

			if (!payment_token) {
				throw new NotFoundException(
					'No se ha encontrado una solicitud de pre-ficha',
				);
			}

			const cleanedData = removeAttributes(payment_token, [
				'id_payment_token',
				'pre_application_token',
				'payment_status',
				'applicant_id',
				'fees_id',
				'id',
				'fee_type',
				'start_date',
				'semester',
				'created_at',
				'updated_at',
				'period_id',
			]);

			return cleanedData;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			this.handleDBErrors(error);
		}
	}

	async createPreApplication(
		user: applicant,
		createPreApplicationRequestDto: CreatePreApplicationRequestDto,
	) {
		try {
			const preApplication =
				await this.prisma.applicant_payment_token.findFirst({
					where: { applicant_id: user.applicant_id },
				});

			if (preApplication) {
				throw new BadRequestException(
					'You have already applied for a pre-application',
				);
			}

			// Obtener el último folio generado
			const lastFolio = await this.prisma.applicant_payment_token.findFirst({
				orderBy: { id_payment_token: 'desc' },
				select: { folio: true },
			});

			// Generar un nuevo folio
			const newFolio = lastFolio ? parseInt(lastFolio.folio) + 1 : 1;

			// Formatear el folio a un número de 4 dígitos (e.g., 0384)
			const formattedFolio = newFolio.toString().padStart(4, '0');

			const fee = await this.prisma.fees.findFirst({
				where: {
					AND: [
						{
							period: { name: user.period },
							fee_type: 'preficha',
						},
					],
				},
			});

			if (!fee) {
				throw new InternalServerErrorException(
					'No se encontró el costo de la preficha para el período actual',
				);
			}

			const totalAmount =
				Number(fee.amount) - (Number(fee.amount) / 100) * Number(fee.discount);

			// Insertar la solicitud de preinscripción en la base de datos
			await this.prisma.applicant_payment_token.create({
				data: {
					folio: formattedFolio,
					career: createPreApplicationRequestDto.career,
					career_model: createPreApplicationRequestDto.career_model,
					pre_application_request_date: new Date(Date.now()),
					state: 'pendiente',

					total_amount_to_pay: totalAmount.toFixed(2),
					payment_status: false,
					payment_method: '',
					reference_number: '',
					applicant: {
						connect: {
							applicant_id: user.applicant_id,
						},
					},
					fees: {
						connect: {
							id: fee.id,
						},
					},
				},
			});
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error;
			}
			this.handleDBErrors(error);
		}
	}

	async updatePreApplication(
		user: applicant,
		updatePreApplicationRequestDto: UpdatePreApplicationRequestDto,
	) {
		try {
			const { applicant_payment_token } =
				await this.prisma.applicant.findUnique({
					where: { applicant_id: user.applicant_id },
					select: {
						applicant_payment_token: {
							select: { pre_application_token: true },
						},
					},
				});

			if (applicant_payment_token.length === 0) {
				throw new NotFoundException(
					'No se encontró la solicitud de pre-ficha a actualizar',
				);
			}

			if (
				typeof applicant_payment_token[0].pre_application_token === 'string'
			) {
				throw new BadRequestException(
					'No se puede actualizar la solicitud de pre-ficha ya que ya se le ha asignado una ficha',
				);
			}

			const paymentToken = await this.prisma.applicant_payment_token.updateMany(
				{
					where: { applicant_id: user.applicant_id },
					data: {
						career: updatePreApplicationRequestDto.career,
						career_model: updatePreApplicationRequestDto.career_model,
						updated_at: new Date(),
					},
				},
			);

			if (paymentToken.count === 0) {
				throw new NotFoundException(
					'No se encontró la solicitud de preinscripción',
				);
			}
		} catch (error) {
			if (
				error instanceof NotFoundException ||
				error instanceof BadRequestException
			) {
				throw error;
			}
			this.handleDBErrors(error);
		}
	}

	async updatePaymentMethod(
		user: applicant,
		updatePaymentMethodDto: UpdatePaymentMethodDto,
	) {
		try {
			const fee = await this.prisma.fees.findFirst({
				where: {
					AND: [
						{
							period: { name: user.period },
							fee_type: 'preficha',
						},
					],
				},
			});

			if (fee.deadline < new Date(Date.now())) {
				throw new BadRequestException(
					'El plazo de pago para la solicitud de preinscripción ha expirado',
				);
			}

			const totalAmount =
				Number(fee.amount) - (Number(fee.amount) / 100) * Number(fee.discount);

			await this.prisma.applicant_payment_token.updateMany({
				where: { applicant_id: user.applicant_id },
				data: {
					total_amount_to_pay: totalAmount,
					payment_method: updatePaymentMethodDto.payment_method,
					reference_number: updatePaymentMethodDto.reference_number,
					updated_at: new Date(),
				},
			});
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error;
			}
			this.handleDBErrors(error);
		}
	}

	async updateTotalAmount(user: applicant) {
		try {
			const { applicant_payment_token } =
				await this.prisma.applicant.findUnique({
					where: { applicant_id: user.applicant_id },
					select: {
						applicant_payment_token: {
							select: {
								id_payment_token: true,
								payment_status: true,
								fees: true,
							},
						},
					},
				});

			const [token] = applicant_payment_token;
			const { id_payment_token, payment_status, fees } = token;
			const totalAmount =
				Number(fees.amount) -
				(Number(fees.amount) / 100) * Number(fees.discount);

			await this.prisma.applicant_payment_token.update({
				where: { id_payment_token },
				data: {
					total_amount_to_pay: totalAmount.toFixed(2),
					updated_at: new Date(),
				},
			});

			if (payment_status) {
				await this.prisma.applicant_payment_token.update({
					where: { id_payment_token },
					data: {
						state: 'completado',
						updated_at: new Date(),
					},
				});
			}
		} catch (error) {
			this.handleDBErrors(error);
		}
	}

	async assignPreApplicationToken(user: applicant) {
		try {
			const { applicant_payment_token } =
				await this.prisma.applicant.findUnique({
					where: { applicant_id: user.applicant_id },
					select: {
						applicant_payment_token: {
							select: { id_payment_token: true, payment_status: true },
						},
					},
				});

			if (applicant_payment_token.length === 0) {
				throw new NotFoundException(
					'No se encontró una solicitud de pre-ficha',
				);
			}

			const [token] = applicant_payment_token;
			const { id_payment_token, payment_status } = token;

			if (!payment_status) {
				throw new BadRequestException(
					'No se ha aprobado el pago para la solicitud de ficha',
				);
			}

			// Obtener todos los tokens generados, ignorando los que tengan pre_application_token en null
			const tokens = await this.prisma.applicant_payment_token.findMany({
				orderBy: { pre_application_token: 'asc' },
				select: { pre_application_token: true },
			});

			// Filtrar los tokens no nulos y convertirlos a números
			const validTokens = tokens
				.map((token) => parseInt(token.pre_application_token))
				.filter((token) => !isNaN(token));

			console.log(validTokens);

			// Generar el nuevo token incrementando el máximo valor existente o comenzando desde 1
			const newToken =
				validTokens.length > 0 ? Math.max(...validTokens) + 1 : 1;

			// Formatear el token a un número de 4 dígitos (e.g., 0384)
			const formattedToken = newToken.toString().padStart(4, '0');

			// Actualizar el pre_application_token en la base de datos
			await this.prisma.applicant_payment_token.update({
				where: { id_payment_token: id_payment_token },
				data: {
					pre_application_token: formattedToken,
					updated_at: new Date(),
				},
			});

			await this.prisma.examn_applicant.create({
				data: {
				  applicant_payment_token_id: id_payment_token,
				  exam_date: new Date(),
				  examn_status: false,
				}
			  });
		} catch (error) {
			if (
				error instanceof BadRequestException ||
				error instanceof NotFoundException
			) {
				throw error;
			}
			this.handleDBErrors(error);
		}
	}

	async getPreApplicationToken(user: applicant) {
		try {
			const payment_token = await this.prisma.applicant_payment_token.findFirst(
				{
					where: { applicant_id: user.applicant_id },
					include: { fees: true, examn_applicant: true},
				},
			);

			if (!payment_token) {
				throw new NotFoundException('No se encontró la solicitud de pre-ficha');
			}

			const cleanedData = removeAttributes(payment_token, [
				'id_payment_token',
				'folio',
				'pre_application_request_date',
				'state',
				'total_amount_to_pay',
				'payment_status',
				'payment_method',
				'reference_number',
				'applicant_id',
				'fees_id',
				'fees',
				'id_examn_applicant',
				'applicant_payment_token_id',
				'examn_status',
			]);

			return cleanedData;
		} catch (error) {
			if (error instanceof NotFoundException) {
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
