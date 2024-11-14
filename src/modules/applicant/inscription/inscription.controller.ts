import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { applicant } from '@prisma/client';
import { UpdateInscriptionPaymentMethodDto } from './dto/update-payment-method.dto';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('applicant/inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}

  @Post('request')
  @Auth(ValidRoles.applicant)
  async createPaymentInscription(@GetUser() user:applicant ) {
    return this.inscriptionService.createApplicantInscription(user);
  }

  @Get()
  @Auth(ValidRoles.applicant)
  async getPaymentInscription(@GetUser() user:applicant) {
    return this.inscriptionService.getInscriptonData(user);
  }

  @Patch('request')
  @Auth(ValidRoles.applicant)
  async updateInscriptionPaymentMethod(
    @GetUser() user:applicant, 
    @Body() updateInscriptionPaymentMethodDto: UpdateInscriptionPaymentMethodDto
  ) {
    return await this.inscriptionService.updatePaymentMethod(
      user, 
      updateInscriptionPaymentMethodDto
    );
  }

  @Patch('init_status-change')
  @Auth(ValidRoles.applicant)
  async updateInscriptionPaymentChange( @GetUser() user: applicant ) {
    return await this.inscriptionService.updateChangePaymentStatus(user);
  }


}
