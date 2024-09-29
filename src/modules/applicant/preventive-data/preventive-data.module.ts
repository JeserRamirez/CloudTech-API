import { Module } from '@nestjs/common';
import { PreventiveDataService } from './preventive-data.service';
import { PreventiveDataController } from './preventive-data.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [PreventiveDataController],
	providers: [PreventiveDataService],
})
export class PreventiveDataModule {}
