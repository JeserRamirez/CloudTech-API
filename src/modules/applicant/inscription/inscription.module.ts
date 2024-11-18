import { Module } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { InscriptionController } from './inscription.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [InscriptionController],
	providers: [InscriptionService],
})
export class InscriptionModule {}
