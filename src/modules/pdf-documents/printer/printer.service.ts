import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import {
	BufferOptions,
	CustomTableLayout,
	TDocumentDefinitions,
} from 'pdfmake/interfaces';

const fonts = {
	Roboto: {
		normal: 'src/modules/pdf-documents/fonts/Roboto-Regular.ttf',
		bold: 'src/modules/pdf-documents/fonts/Roboto-Medium.ttf',
		italics: 'src/modules/pdf-documents/fonts/Roboto-Italic.ttf',
		bolditalics: 'src/modules/pdf-documents/fonts/Roboto-MediumItalic.ttf',
	},
};

const customTableLayouts: Record<string, CustomTableLayout> = {
	// customLayout01: {
	// 	hLineWidth: function (i, node) {
	// 		if (i === 0 || i === node.table.body.length) {
	// 			return 0;
	// 		}
	// 		return i === node.table.headerRows ? 2 : 1;
	// 	},
	// 	vLineWidth: function (i) {
	// 		return 0;
	// 	},
	// 	hLineColor: function (i) {
	// 		return i === 1 ? 'black' : '#bbbbbb';
	// 	},
	// 	paddingLeft: function (i) {
	// 		return i === 0 ? 0 : 8;
	// 	},
	// 	paddingRight: function (i, node) {
	// 		return i === node.table.widths.length - 1 ? 0 : 8;
	// 	},
	// 	fillColor: function (i, node) {
	// 		if (i === 0) {
	// 			return '#7b90be';
	// 		}

	// 		// if (i === node.table.body.length - 1) {
	// 		//   return '#7b90be';
	// 		// }

	// 		return i % 2 === 0 ? '#f3f3f3' : null;
	// 	},
	// },
	// blueBorder: {
	// 	hLineColor: function () {
	// 		return '#5f96d4';
	// 	},
	// 	vLineColor: function () {
	// 		return '#5f96d4';
	// 	},
	// },
	allLineWidthTable: {
		hLineWidth: function () {
			return 5;
		},
		vLineWidth: function () {
			return 5;
		},
	},
	noVerticalPaddingTable: {
		paddingBottom: function () {
			return 0;
		}, // Adjust the padding bottom of each row
		paddingTop: function () {
			return 0;
		}, // Adjust the padding top of each row
	},
	noPaddingTable: {
		paddingBottom: function () {
			return 0;
		}, // Adjust the padding bottom of each row
		paddingTop: function () {
			return 0;
		}, // Adjust the padding top of each row
		paddingLeft: function () {
			return 0;
		}, // Adjust the padding left of each row
		paddingRight: function () {
			return 0;
		}, // Adjust the padding right of each row
	},
	kardexListTableLayout: {
		fillColor: function (i, node) {
			if (i === 1) {
				return '#003F7F';
			}
		},
	},
};

@Injectable()
export class PrinterService {
	private printer = new PdfPrinter(fonts);

	createPdf(
		docDefinition: TDocumentDefinitions,
		options: BufferOptions = {
			tableLayouts: customTableLayouts,
		},
	): PDFKit.PDFDocument {
		return this.printer.createPdfKitDocument(docDefinition, options);
	}
}
