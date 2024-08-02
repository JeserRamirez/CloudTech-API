import { Controller, Get, Res } from '@nestjs/common';
import { StudentReportsService } from './student-reports.service';
import { Response } from 'express';

@Controller('student-reports')
export class StudentReportsController {
	constructor(private readonly studentReportsService: StudentReportsService) {}
	@Get()
	async hello(@Res() response: Response) {
		const pdfDoc = this.studentReportsService.hello();

		response.setHeader('Content-Type', 'application/pdf');
		pdfDoc.info.Title = 'Hola-Mundo.pdf';
		pdfDoc.pipe(response);
		pdfDoc.end();
	}
}
