import { Module } from '@nestjs/common';
import { TeacherEvaluationService } from './teacher-evaluation.service';
import { TeacherEvaluationController } from './teacher-evaluation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../../../auth/auth.module';

@Module({
	imports: [AuthModule, PrismaModule],
	controllers: [TeacherEvaluationController],
	providers: [TeacherEvaluationService],
})
export class TeacherEvaluationModule {}
