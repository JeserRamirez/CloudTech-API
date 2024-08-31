import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import {
	getKardexGraphicReport,
	getKardexListReport,
	getPeriodGradesReport,
	getScheduleReport,
} from '../reports/student-reports';

@Injectable()
export class StudentReportsService extends PrinterService {
	constructor(private readonly printerService: PrinterService) {
		super();
	}

	schedule() {
		const docDefinition = getScheduleReport();

		const doc = this.printerService.createPdf(docDefinition);

		return doc;
	}

	periodGrades() {
		const docDefinition = getPeriodGradesReport();

		const doc = this.printerService.createPdf(docDefinition);

		return doc;
	}
	kardexList() {
		const docDefinition = getKardexListReport();

		const doc = this.printerService.createPdf(docDefinition);

		return doc;
	}

	kardexGraphic() {
		const docDefinition = getKardexGraphicReport();

		const doc = this.printerService.createPdf(docDefinition);

		return doc;
	}
}
