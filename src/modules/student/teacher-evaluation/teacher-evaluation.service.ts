import { Injectable } from '@nestjs/common';
import { CreateTeacherEvaluationDto } from './dto/create-teacher-evaluation.dto';
import { UpdateTeacherEvaluationDto } from './dto/update-teacher-evaluation.dto';

@Injectable()
export class TeacherEvaluationService {
	create(createTeacherEvaluationDto: CreateTeacherEvaluationDto) {
		return 'This action adds a new teacherEvaluation';
	}

	findAll() {
		return `This action returns all teacherEvaluation`;
	}

	findOne(id: number) {
		return `This action returns a #${id} teacherEvaluation`;
	}

	update(id: number, updateTeacherEvaluationDto: UpdateTeacherEvaluationDto) {
		return `This action updates a #${id} teacherEvaluation`;
	}

	remove(id: number) {
		return `This action removes a #${id} teacherEvaluation`;
	}
}
