import { PartialType } from '@nestjs/mapped-types';
import { CreateInscriptionPaymentMethodDto } from './create-payment-method.dto';

export class UpdateInscriptionPaymentMethodDto extends PartialType(CreateInscriptionPaymentMethodDto) {}
