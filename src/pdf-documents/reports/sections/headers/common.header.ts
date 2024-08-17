import type { Content } from 'pdfmake/interfaces';
import fs from 'fs';
import { DateFormatter } from 'src/pdf-documents/helpers';

const svgLogoItmina = fs.readFileSync(
	'src/pdf-documents/assets/itminaLogo.svg',
	'utf8',
);

const currentDate: Content = {
	text: DateFormatter.getYYYYMMDD(new Date()),
};

interface HeaderOptions {
	documentType?: string;
	period?: string;
	careerModel?: string;
	showDate?: boolean;
	controlNumber?: string;
	name?: string;
	periodNumber?: string;
	career?: string;
	credits?: string;
	showCredits?: boolean;
	packNumber?: string;
}

export const commonHeaderSection = (options: HeaderOptions): Content => {
	const {
		documentType,
		period,
		careerModel,
		showDate,
		controlNumber,
		name,
		periodNumber,
		career,
		credits,
		showCredits,
		packNumber,
	} = options;

	return {
		margin: [20, 10, 20, 0],

		table: {
			widths: ['auto', '*'],
			body: [
				[
					// Logo
					{
						svg: svgLogoItmina,
						width: 80,
						fit: [80, 80],
						alignment: 'left',
						border: [false, false, false, false],
					},
					// Info Header
					{
						border: [false, false, false, false],
						table: {
							widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
							body: [
								// School Name
								[
									{
										text: 'Instituto Tecnológico de Minatitlán',
										colSpan: 6,
										alignment: 'center',
										font: 'Roboto',
										bold: true,
										border: [false, false, false, true],
									},
									{},
									{},
									{},
									{},
									{},
								],
								// Type of Document and Period
								[
									{
										fontSize: 10,
										text: 'CARGA ACADEMICA',
										colSpan: 4,
										border: [false, false, false, false],
									},
									{},
									{},
									{},
									{
										fontSize: 10,
										text: 'PERIODO:',
										alignment: 'right',
										border: [false, false, false, false],
									},
									{
										fontSize: 10,
										text: 'ENEJUN2024',
										alignment: 'right',
										border: [false, false, false, true],
									},
								],
								// Date
								[
									{
										fontSize: 10,
										text: 'P',
										alignment: 'right',
										border: [false, false, false, false],
									},
									{
										text: '',
										colSpan: 3,
										border: [false, false, false, false],
									},
									{},
									{},
									{
										fontSize: 10,
										text: 'FECHA:',
										alignment: 'right',
										border: [false, false, false, false],
									},
									{
										fontSize: 10,
										text: currentDate,
										alignment: 'right',
										border: [false, false, false, true],
									},
								],
								// Control number, name, no. period
								[
									{
										fontSize: 10,
										text: '20230238',
										border: [false, false, false, false],
									},
									{
										fontSize: 10,
										text: 'Pepe el Grillo Martinez',
										colSpan: 3,
										border: [false, false, false, false],
									},
									{},
									{},
									{
										fontSize: 10,
										text: 'NPRDO:',
										alignment: 'right',
										border: [false, false, false, false],
									},
									{
										fontSize: 10,
										text: '8',
										alignment: 'center',
										border: [false, false, false, true],
									},
								],
								// Career, credits, pack
								[
									{
										fontSize: 10,
										text: 'CARRERA',
										border: [false, false, false, false],
									},
									{
										fontSize: 10,
										text: 'ING. SIST. COMP',
										border: [false, false, false, false],
									},
									{
										fontSize: 10,
										text: 'CREDITOS:',
										alignment: 'right',
										border: [false, false, false, false],
									},
									{
										fontSize: 10,
										text: '32.00',
										alignment: 'right',
										border: [false, false, false, true],
									},
									{
										fontSize: 10,
										text: 'PAQUETE:',
										alignment: 'right',
										border: [false, false, false, false],
									},
									{
										fontSize: 10,
										text: '08A',
										alignment: 'center',
										border: [false, false, false, true],
									},
								],
							],
						},
					},
				],
			],
		},
	};
};
