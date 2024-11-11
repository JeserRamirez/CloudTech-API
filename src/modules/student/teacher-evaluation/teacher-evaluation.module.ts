import { Module } from '@nestjs/common';
import { TeacherEvaluationService } from './teacher-evaluation.service';
import { TeacherEvaluationController } from './teacher-evaluation.controller';

@Module({
	controllers: [TeacherEvaluationController],
	providers: [TeacherEvaluationService],
})
export class TeacherEvaluationModule {}
