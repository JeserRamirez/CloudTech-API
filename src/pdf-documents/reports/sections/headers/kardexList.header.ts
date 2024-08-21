import type { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/pdf-documents/helpers';

const svgLogoSep = 'src/pdf-documents/assets/sepLogo.png';

const currentDate: Content = {
	text: DateFormatter.getYYYYMMDD(new Date()),
};

interface HeaderOptions {
	documentType?: string;
	controlNumber?: string;
	name?: string;
	plan?: string;
	speciality?: string;
	entryDate?: string;
	totalCredits?: string;
	totalSubjects?: string;
	endDate?: string;
	accumulatedCredits?: string;
	subjectsTaken?: string;
	periodNumber?: string;
	creditsTaken?: string;
	approvedSubjects?: string;
	averageWithFailed?: string;
	studentSituation?: string;
	averageWithoutFailed?: string;
}

const styles = {
	kardexListHeader: {
		fontSize: 8,
		font: 'Roboto',
		alignment: 'left',
		color: 'black',
	},
};

// Pagemargins recomended on the top 170
export const kardexListHeaderSection = (): Content => {
	return {
		stack: [
			{
				margin: [20, 15, 20, 0],
				// Sep Logo and school name
				layout: 'noBorders',
				table: {
					widths: [200, '*'],
					body: [
						[
							// Logo
							{
								image: svgLogoSep,
								fit: [150, 44.5],
								alignment: 'center',
							},
							// school name
							{
								margin: [0, 5, 0, 0],
								stack: [
									{
										text: 'TECNOLÓGICO NACIONAL DE MÉXICO',
										alignment: 'center',
										fontSize: 14,
										bold: true,
									},
									{
										text: 'Instituto Tecnológico de Minatitlán',
										alignment: 'center',
										bold: true,
									},
								],
							},
						],
					],
				},
			},
			{
				margin: [20, 10, 20, 0],
				// Kardex List information
				layout: 'noVerticalPaddingTable',
				table: {
					widths: [
						'auto',
						'*',
						'auto',
						'auto',
						'auto',
						'auto',
						'auto',
						'auto',
						'auto',
						'*',
					],
					body: [
						// First row
						[
							{
								text: `ESTUDIANTE:`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: `20230239 JESER RAMIREZ ESTRADA`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
								colSpan: 6,
							},
							{},
							{},
							{},
							{},
							{},
							{
								text: `FECHA:`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: currentDate,
								style: styles.kardexListHeader,
								alignment: 'center',
								border: [false, false, false, true],
								bold: true,
							},
							{
								text: `KARDEX`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
								alignment: 'right',
							},
						],
						// Second row
						[
							{
								text: `CARRERA:`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: `INGENIERIA EN SISTEMAS COMPUTACIONALES`,
								style: styles.kardexListHeader,
								colSpan: 9,
								border: [false, false, false, false],
							},
							{},
							{},
							{},
							{},
							{},
							{},
							{},
							{},
						],
						// Third row
						[
							{
								text: `PLAN:`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: `ISIC-2010-224`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
								colSpan: 9,
							},
							{},
							{},
							{},
							{},
							{},
							{},
							{},
							{},
						],
						// Forth row
						[
							{
								text: `ESPEC:`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: `ISIE-CEN-2022-02 CÓMPUTO EN LA NUBE`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
								colSpan: 9,
							},
							{},
							{},
							{},
							{},
							{},
							{},
							{},
							{},
						],
						// Fifth row
						[
							{
								text: `INGRESO:`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: `2203 AGODIC2020`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'CRE.TOT:',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '260',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'MAT.TOT.:',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '50',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'NP.CONV:',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '0',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
						],
						// Sixth row
						[
							{
								text: `TERMINO:`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: ``,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'CRE.ACU:',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '227',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'MAT.CUR:',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '49',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'NPRDO:',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '8',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
						],
						// Seventh row
						[
							{
								text: ``,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: ``,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'CRE.CUR:',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'MAT.APR:',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '49',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'PROMEDIO:',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '93.27',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'CON REPROBADAS',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
						],
						// Eighth row
						[
							{
								text: `SITUACIÓN:`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: `VIGENTE`,
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'PCTJE:',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '87',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'MAT.APR.AC:',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '1',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '93.27',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: 'SIN REPROBADAS',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
							{
								text: '',
								style: styles.kardexListHeader,
								border: [false, false, false, false],
							},
						],
					],
				},
			},
		],
	};
};
