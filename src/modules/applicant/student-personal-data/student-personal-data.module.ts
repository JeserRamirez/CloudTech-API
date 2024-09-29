import { Module } from '@nestjs/common';
import { StudentPersonalDataService } from './student-personal-data.service';
import { StudentPersonalDataController } from './student-personal-data.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [StudentPersonalDataController],
	providers: [StudentPersonalDataService],
})
export class StudentPersonalDataModule {}
