import { Controller, Get, Res } from '@nestjs/common';
import { StudentReportsService } from './student-reports.service';
import { Response } from 'express';

@Controller('student-reports')
export class StudentReportsController {
	constructor(private readonly studentReportsService: StudentReportsService) {}
	@Get('schedule')
	async getSchedule(@Res() response: Response) {
		const pdfDoc = this.studentReportsService.schedule();

		response.setHeader('Content-Type', 'application/pdf');
		pdfDoc.info.Title = 'CargaAcademica.pdf';
		pdfDoc.pipe(response);
		pdfDoc.end();
	}

	@Get('period-grades')
	async getPeriodGrades(@Res() response: Response) {
		const pdfDoc = this.studentReportsService.periodGrades();

		response.setHeader('Content-Type', 'application/pdf');
		pdfDoc.info.Title = 'CalificacionesPorPeriodo.pdf';
		pdfDoc.pipe(response);
		pdfDoc.end();
	}

	@Get('kardex-list')
	async getKardexList(@Res() response: Response) {
		const pdfDoc = this.studentReportsService.kardexList();

		response.setHeader('Content-Type', 'application/pdf');
		pdfDoc.info.Title = 'KardexLista.pdf';
		pdfDoc.pipe(response);
		pdfDoc.end();
	}

	@Get('kardex-graphic')
	async getKardexGraphic(@Res() response: Response) {
		const pdfDoc = this.studentReportsService.kardexGraphic();

		response.setHeader('Content-Type', 'application/pdf');
		pdfDoc.info.Title = 'KardexGrafico.pdf';
		pdfDoc.pipe(response);
		pdfDoc.end();
	}
}
