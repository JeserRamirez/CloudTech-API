import { Module } from '@nestjs/common';
import { TeacherPersonalDataService } from './teacher-personal-data.service';
import { TeacherPersonalDataController } from './teacher-personal-data.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [TeacherPersonalDataController],
	providers: [TeacherPersonalDataService],
})
export class TeacherPersonalDataModule {}
