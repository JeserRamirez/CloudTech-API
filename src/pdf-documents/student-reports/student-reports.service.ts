import { Injectable } from '@nestjs/common';
import { getHelloWorldReport } from '../reports/hello-world.report';
import { PrinterService } from '../printer/printer.service';

@Injectable()
export class StudentReportsService extends PrinterService {
	constructor(private readonly printerService: PrinterService) {
		super();
	}

	hello() {
		const docDefinition = getHelloWorldReport({
			name: 'Jeser',
		});

		const doc = this.printerService.createPdf(docDefinition);

		return doc;
	}
}
