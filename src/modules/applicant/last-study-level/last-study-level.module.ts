import { Module } from '@nestjs/common';
import { LastStudyLevelService } from './last-study-level.service';
import { LastStudyLevelController } from './last-study-level.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [LastStudyLevelController],
	providers: [LastStudyLevelService],
})
export class LastStudyLevelModule {}
