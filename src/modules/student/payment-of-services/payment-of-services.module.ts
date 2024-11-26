import { Module } from '@nestjs/common';
import { PaymentOfServicesService } from './payment-of-services.service';
import { PaymentOfServicesController } from './payment-of-services.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [PaymentOfServicesController],
	providers: [PaymentOfServicesService],
})
export class PaymentOfServicesModule {}
