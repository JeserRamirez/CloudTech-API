import { Module } from '@nestjs/common';
import { PreApplicationService } from './pre-application.service';
import { PreApplicationController } from './pre-application.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [PreApplicationController],
	providers: [PreApplicationService],
})
export class PreApplicationModule {}
