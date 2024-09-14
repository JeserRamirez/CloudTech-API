import { Module } from '@nestjs/common';
import { JobDataService } from './job-data.service';
import { JobDataController } from './job-data.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [JobDataController],
	providers: [JobDataService],
})
export class JobDataModule {}
