import { Module } from '@nestjs/common';
import { StudentTutorDataService } from './student-tutor-data.service';
import { StudentTutorDataController } from './student-tutor-data.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [StudentTutorDataController],
	providers: [StudentTutorDataService],
})
export class StudentTutorDataModule {}
