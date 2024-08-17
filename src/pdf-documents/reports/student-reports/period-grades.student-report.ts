import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { commonHeaderSection } from '../sections/headers';
import { footerSection } from '../sections';

const styles: StyleDictionary = {
	header: {
		fontSize: 10,
		font: 'Roboto',
		alignment: 'center',
		color: 'black',
		bold: true,
	},
	body: {
		fontSize: 10,
		font: 'Roboto',
		alignment: 'left',
		color: 'black',
		margin: [5, 5, 5, 5],
	},
	subjectResume: {
		font: 'Roboto',
		alignment: 'right',
		color: 'black',
		margin: [5, 0, 5, 0],
	},
	bossInformation: {
		font: 'Roboto',
		alignment: 'left',
		color: 'black',
		bold: true,
		margin: [0, 2, 0, 2],
	},
};

export const getPeriodGradesReport = (): TDocumentDefinitions => {
	const docDefinition: TDocumentDefinitions = {
		styles: styles,

		pageMargins: [50, 120, 50, 40],
		header: commonHeaderSection({}),

		content: [
			{
				table: {
					headerRows: 1,
					widths: ['auto', '*', 'auto', 'auto', 'auto'],
					body: [
						[
							{ text: 'CLAVE', style: 'header' },
							{ text: 'CURSO/CATEDRATICO', style: 'header' },
							{ text: 'CRED.', style: 'header' },
							{ text: 'CALIF.', style: 'header' },
							{ text: 'OPCION', style: 'header' },
						],
						[
							{ text: `ACA0910J`, style: 'body', alignment: 'left' },
							{
								stack: [
									{ text: `TALLER DE INV. II` },
									{ text: `MARIA CONCEPCION VILLATORO CRUZ` },
								],
								style: 'body',
							},
							{ text: `0004`, style: 'body', alignment: 'right' },
							{ text: `96`, style: 'body', alignment: 'right' },
							{ text: `ORDINARIO EV1A`, style: 'body' },
						],
						[
							{ text: `AEB1055A`, style: 'body', alignment: 'left' },
							{
								stack: [
									{ text: `PROG. WEB` },
									{ text: `VICTOR ALBERTO REYES VILLAVICENCIO` },
								],
								style: 'body',
							},
							{ text: `0005`, style: 'body', alignment: 'right' },
							{ text: `98`, style: 'body', alignment: 'right' },
							{ text: `ORDINARIO EV1A`, style: 'body' },
						],
						[
							{ text: `CEG2202A`, style: 'body', alignment: 'left' },
							{
								stack: [
									{ text: `ARQ DE SOL EN LA NU` },
									{ text: `ARTURO IVAN GRAJALES VAZQUEZ` },
								],
								style: 'body',
							},
							{ text: `0006`, style: 'body', alignment: 'right' },
							{ text: `99`, style: 'body', alignment: 'right' },
							{ text: `ORDINARIO EV1A`, style: 'body' },
						],
						[
							{ text: `SCA1002A`, style: 'body', alignment: 'left' },
							{
								stack: [
									{ text: `Adm. de Redes` },
									{ text: `VICTOR ALBERTO REYES VILLAVICENCIO` },
								],
								style: 'body',
							},
							{ text: `0004`, style: 'body', alignment: 'right' },
							{ text: `99`, style: 'body', alignment: 'right' },
							{ text: `ORDINARIO EV1A`, style: 'body' },
						],
						[
							{ text: `SCB1001A`, style: 'body', alignment: 'left' },
							{
								stack: [
									{ text: `ADM. BD` },
									{ text: `FELIPE DE JESUS HERNANDEZ PEREZ` },
								],
								style: 'body',
							},
							{ text: `0005`, style: 'body', alignment: 'right' },
							{ text: `85`, style: 'body', alignment: 'right' },
							{ text: `ORDINARIO EV2A`, style: 'body' },
						],
						[
							{ text: `SCC1012A`, style: 'body', alignment: 'left' },
							{
								stack: [
									{ text: `IA (Inteligencia Ar` },
									{ text: `SONIA MARTINEZ GUZMAN` },
								],
								style: 'body',
							},
							{ text: `0004`, style: 'body', alignment: 'right' },
							{ text: `99`, style: 'body', alignment: 'right' },
							{ text: `ORDINARIO EV1A`, style: 'body' },
						],
						[
							{ text: `SCC1019A`, style: 'body', alignment: 'left' },
							{
								stack: [
									{ text: `Prog. Lógica y Func` },
									{ text: `SYLFRA AVENDAÑO ROMERO` },
								],
								style: 'body',
							},
							{ text: `0004`, style: 'body', alignment: 'right' },
							{ text: `97`, style: 'body', alignment: 'right' },
							{ text: `ORDINARIO EV1A`, style: 'body' },
						],
						[
							{ text: ``, style: 'body' },
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ text: ``, style: 'body' },
							{ text: ``, style: 'body' },
							{ text: ``, style: 'body' },
						],
					],
				},
			},
			{
				margin: [25, 15, 0, 0],
				columns: [
					{
						margin: [0, 25, 0, 0],
						stack: [
							{
								canvas: [
									{
										type: 'line',
										x1: 0,
										y1: 5,
										x2: 225,
										y2: 5,
										lineWidth: 2,
										lineColor: 'black',
									},
								],
							},
							{
								text: 'ING ANA MARIA NARVAEZ HERNANDEZ',
								style: 'bossInformation',
							},
							{
								text: 'JEFE DEL DEPARTAMENTO DE SERVICIOS ESCOLARES',
								style: 'bossInformation',
							},
						],
						width: 300,
					},
					{
						table: {
							widths: ['auto', 'auto'],
							body: [
								[
									{
										text: 'PROMEDIO:',
										border: [false, false, false, false],
										style: 'subjectResume',
									},
									{ text: `96.14`, style: 'subjectResume' },
								],
								[
									{
										text: 'MAT.REPROB:',
										border: [false, false, false, false],
										style: 'subjectResume',
									},
									{ text: `0`, style: 'subjectResume' },
								],
								[
									{
										text: 'CREDITOS:',
										border: [false, false, false, false],
										style: 'subjectResume',
									},
									{ text: `32.00`, style: 'subjectResume' },
								],
								[
									{
										text: 'CRED.APR:',
										border: [false, false, false, false],
										style: 'subjectResume',
									},
									{ text: `32.00`, style: 'subjectResume' },
								],
							],
						},
						alignment: 'right',
					},
				],
			},
		],

		footer: (currentPage, pageCount) =>
			footerSection(currentPage, pageCount, {
				showSchoolarServiceFooter: false,
			}),
	};

	return docDefinition;
};
