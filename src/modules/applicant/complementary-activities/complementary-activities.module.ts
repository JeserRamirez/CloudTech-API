import { Module } from '@nestjs/common';
import { ComplementaryActivitiesService } from './complementary-activities.service';
import { ComplementaryActivitiesController } from './complementary-activities.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [ComplementaryActivitiesController],
	providers: [ComplementaryActivitiesService],
})
export class ComplementaryActivitiesModule {}
