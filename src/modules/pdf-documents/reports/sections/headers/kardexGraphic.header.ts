import type { Content } from 'pdfmake/interfaces';
import fs from 'fs';
import { DateFormatter } from 'src/modules/pdf-documents/helpers';

const svgLogoItmina = fs.readFileSync(
	'src/modules/pdf-documents/assets/itminaLogo.svg',
	'utf8',
);

const currentDate: Content = {
	text: DateFormatter.getYYYYMMDD(new Date()),
};

// interface HeaderOptions {
// 	documentType?: string;
// 	period?: string;
// 	careerModel?: string;
// 	showDate?: boolean;
// 	controlNumber?: string;
// 	name?: string;
// 	periodNumber?: string;
// 	career?: string;
// 	credits?: string;
// 	showCredits?: boolean;
// 	packNumber?: string;
// }

const styles = {
	kardexGraphicHeaderLeft: {
		fontSize: 10,
		font: 'Roboto',
		alignment: 'left',
		color: 'black',
	},
	kardexGraphicHeaderCenter: {
		fontSize: 10,
		font: 'Roboto',
		alignment: 'center',
		color: 'black',
	},
	kardexGraphicHeaderRight: {
		fontSize: 10,
		font: 'Roboto',
		alignment: 'right',
		color: 'black',
	},
};

// IMPORTANT: This header should be used ONLY for horizontal pages
// Pagemargins recomended: [40, 125, 40, 40]
export const kardexGraphicHeaderSection = (): Content => {
	return {
		margin: [20, 10, 20, 0],
		layout: 'noBorders',
		table: {
			widths: ['auto', '*', 'auto'],
			body: [
				[
					// Logo
					{
						svg: svgLogoItmina,
						width: 80,
						fit: [80, 80],
						alignment: 'left',
						margin: [0, 10, 0, 0],
					},
					// Info Header
					{
						margin: [0, 10, 0, 0],
						table: {
							widths: [
								'auto',
								'*',
								'auto',
								'auto',
								'auto',
								'auto',
								'auto',
								25,
								25,
								25,
								25,
							],
							body: [
								// First row of info header
								[
									{
										text: 'INSTITUTO TECNOLÓGICO DE MINATITLÁN',
										colSpan: 7,
										alignment: 'center',
										fontSize: 12,
										bold: true,
										font: 'Roboto',
										color: 'black',
									},
									{},
									{},
									{},
									{},
									{},
									{},
									{
										text: 'FECHA: ',
										colSpan: 2,
										style: styles.kardexGraphicHeaderCenter,
									},
									{},
									{
										text: currentDate,
										colSpan: 2,
										style: styles.kardexGraphicHeaderRight,
									},
									{},
								],
								// Second row of info header
								[
									{ text: '20230239', style: styles.kardexGraphicHeaderLeft },
									{
										text: 'Pepe El Grillo Martinez Perez',
										colSpan: 4,
										style: styles.kardexGraphicHeaderCenter,
									},
									{},
									{},
									{},
									{ text: 'CR.ACUM:', style: styles.kardexGraphicHeaderLeft },
									{ text: '227.00', style: styles.kardexGraphicHeaderRight },
									{
										text: `CREDITOS PARA
										EGRESAR EN`,
										colSpan: 4,
										rowSpan: 2,
										style: styles.kardexGraphicHeaderCenter,
									},
									{},
									{},
									{},
								],
								// Third row of info header
								[
									{ text: 'CARRERA:', style: styles.kardexGraphicHeaderLeft },
									{
										text: `18 ING.SIST.COMP.`,
										style: styles.kardexGraphicHeaderLeft,
									},
									{ text: '260.00', style: styles.kardexGraphicHeaderRight },
									{ text: 'INGRESO:', style: styles.kardexGraphicHeaderLeft },
									{ text: '2203', style: styles.kardexGraphicHeaderRight },
									{ text: '%.ACUM:', style: styles.kardexGraphicHeaderLeft },
									{ text: '87', style: styles.kardexGraphicHeaderRight },
									{},
									{},
									{},
									{},
								],
								// forth row of info header
								[
									{ text: 'PLAN:', style: styles.kardexGraphicHeaderLeft },
									{
										text: '4 ISIC-2010-224',
										style: styles.kardexGraphicHeaderLeft,
									},
									{ text: '235.00', style: styles.kardexGraphicHeaderRight },
									{ text: 'TERMINO:', style: styles.kardexGraphicHeaderLeft },
									{ text: '', style: styles.kardexGraphicHeaderRight },
									{ text: 'N.PDO:', style: styles.kardexGraphicHeaderLeft },
									{ text: '8', style: styles.kardexGraphicHeaderRight },
									{ text: '09', style: styles.kardexGraphicHeaderCenter },
									{ text: '10 ', style: styles.kardexGraphicHeaderCenter },
									{ text: '11', style: styles.kardexGraphicHeaderCenter },
									{ text: '12', style: styles.kardexGraphicHeaderCenter },
								],
								// fifth row of info header
								[
									{
										text: 'ESPECIALIDAD:',
										style: styles.kardexGraphicHeaderLeft,
									},
									{
										text: '1 ISIE-CEN-2022-02',
										style: styles.kardexGraphicHeaderLeft,
									},
									{ text: '25.00', style: styles.kardexGraphicHeaderRight },
									{ text: 'PROM:', style: styles.kardexGraphicHeaderLeft },
									{ text: '93.27', style: styles.kardexGraphicHeaderRight },
									{ text: 'CR.CURSA:', style: styles.kardexGraphicHeaderLeft },
									{ text: '', style: styles.kardexGraphicHeaderRight },
									{ text: '33', style: styles.kardexGraphicHeaderCenter },
									{ text: '10', style: styles.kardexGraphicHeaderCenter },
									{ text: '11', style: styles.kardexGraphicHeaderCenter },
									{ text: '8', style: styles.kardexGraphicHeaderCenter },
								],
							],
						},
					},
					// Photo
					{
						stack: [
							{
								layout: 'allLineWidthTable',
								table: {
									widths: [80],
									heights: 75,
									body: [[{ text: '', fillColor: 'gray' }]],
								},
								alignment: 'center',
							},
							{
								text: `SITUACIÓN: VIGENTE`,
								style: styles.kardexGraphicHeaderLeft,
								margin: [0, 5, 0, 0],
							},
						],
					},
				],
			],
		},
	};
};
