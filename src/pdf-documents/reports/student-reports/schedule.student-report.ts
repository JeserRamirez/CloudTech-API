import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { commonHeaderSection } from '../sections/headers';
import { footerSection } from '../sections';

const styles: StyleDictionary = {
	header: {
		fontSize: 8,
		font: 'Roboto',
		alignment: 'center',
		color: 'black',
		bold: true,
	},
	body: {
		fontSize: 8,
		font: 'Roboto',
		alignment: 'left',
		color: 'black',
		margin: [0, 5, 0, 5],
	},
	captionNote: {
		fontSize: 8,
		font: 'Roboto',
		alignment: 'center',
		lineHeight: 1.2,
		margin: [0, 5, 0, 0],
	},
	smallCaptionLetter: {
		fontSize: 6,
		font: 'Roboto',
		alignment: 'right',
		bold: true,
	},
	departmentHeadSignature: {
		fontSize: 8,
		font: 'Roboto',
		alignment: 'left',
		lineHeight: 1.2,
		margin: [10, 0, 0, 0],
	},
	notes: {
		fontSize: 8,
		font: 'Roboto',
		alignment: 'left',
		margin: [0, 10, 0, 0],
	},
};

export const getScheduleReport = (): TDocumentDefinitions => {
	const docDefinition: TDocumentDefinitions = {
		styles: styles,

		pageMargins: [15, 120, 15, 40],
		header: commonHeaderSection({}),

		content: [
			// Schedule table
			{
				table: {
					headerRows: 1,
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
						'auto',
						'auto',
					],
					body: [
						[
							{ text: 'CLAVE', style: 'header' },
							{ text: 'MATERIA/DOCENTE', style: 'header' },
							{ text: 'Mo', style: 'header' },
							{ text: 'LUNES', style: 'header' },
							{ text: 'MARTES', style: 'header' },
							{ text: 'MIERCOLES', style: 'header' },
							{ text: 'JUEVES', style: 'header' },
							{ text: 'VIERNES', style: 'header' },
							{ text: 'SABADO', style: 'header' },
							{ text: 'DOMINGO', style: 'header' },
							{ text: `C/A`, style: 'header' },
						],
						[
							{ text: `ACA0910 J`, style: 'body' },
							{
								stack: [
									{ text: `04.00 TALLER DE INV. II` },
									{ text: `MARIA CONCEPCION VILLATORO` },
								],
								style: 'body',
							},
							{ text: `P`, style: 'body' },
							{
								stack: [{ text: `12:00-13:00` }, { text: `H8` }],
								style: 'body',
							},
							{
								stack: [{ text: `12:00-13:00` }, { text: `H8` }],
								style: 'body',
							},
							{
								stack: [{ text: `12:00-13:00` }, { text: `H8` }],
								style: 'body',
							},
							{
								stack: [{ text: `12:00-13:00` }, { text: `H8` }],
								style: 'body',
							},
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ text: ``, style: 'body' },
						],
						[
							{ text: `AEB1055 A`, style: 'body' },
							{
								stack: [
									{ text: `05.00 PROG. WEB` },
									{ text: `VICTOR ALBERTO REYES` },
								],
								style: 'body',
							},
							{ text: `P`, style: 'body' },
							{
								stack: [{ text: `15:00-16:00` }, { text: `SC1` }],
								style: 'body',
							},
							{
								stack: [{ text: `15:00-16:00` }, { text: `SC1` }],
								style: 'body',
							},
							{
								stack: [{ text: `15:00-16:00` }, { text: `SC1` }],
								style: 'body',
							},
							{
								stack: [{ text: `15:00-16:00` }, { text: `SC1` }],
								style: 'body',
							},
							{
								stack: [{ text: `15:00-16:00` }, { text: `SC1` }],
								style: 'body',
							},
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ text: ``, style: 'body' },
						],
						[
							{ text: `CEG2202 A`, style: 'body' },
							{
								stack: [
									{ text: `06.00 ARQ DE SOL EN LA NUB` },
									{ text: `ARTURO IVAN GRAJALES VAZQUEZ` },
								],
								style: 'body',
							},
							{ text: `P`, style: 'body' },
							{
								stack: [{ text: `13:00-15:00` }, { text: `SC1` }],
								style: 'body',
							},
							{
								stack: [{ text: `13:00-15:00` }, { text: `SC1` }],
								style: 'body',
							},
							{
								stack: [{ text: `13:00-15:00` }, { text: `SC1` }],
								style: 'body',
							},
							{
								stack: [{ text: `13:00-15:00` }, { text: `SC1` }],
								style: 'body',
							},
							{
								stack: [{ text: `13:00-15:00` }, { text: `SC1` }],
								style: 'body',
							},
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ text: ``, style: 'body' },
						],
						[
							{ text: `SCA1002 A`, style: 'body' },
							{
								stack: [
									{ text: `04.00 Adm. de Redes` },
									{ text: `VICTOR ALBERTO REYES` },
								],
								style: 'body',
							},
							{ text: `P`, style: 'body' },
							{
								stack: [{ text: `16:00-17:00` }, { text: `LR` }],
								style: 'body',
							},
							{
								stack: [{ text: `16:00-17:00` }, { text: `LR` }],
								style: 'body',
							},
							{
								stack: [{ text: `16:00-17:00` }, { text: `LR` }],
								style: 'body',
							},
							{
								stack: [{ text: `16:00-17:00` }, { text: `LR` }],
								style: 'body',
							},
							{
								stack: [{ text: `` }, { text: `` }],
								style: 'body',
							},
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ text: ``, style: 'body' },
						],
						[
							{ text: `SCB1001 A`, style: 'body' },
							{
								stack: [
									{ text: `05.00 ADM. BD` },
									{ text: `FELIPE DE JESUS HERNANDEZ PEREZ` },
								],
								style: 'body',
							},
							{ text: `P`, style: 'body' },
							{
								stack: [{ text: `11:00-12:00` }, { text: `SC1` }],
								style: 'body',
							},
							{
								stack: [{ text: `11:00-12:00` }, { text: `SC1` }],
								style: 'body',
							},
							{
								stack: [{ text: `11:00-12:00` }, { text: `SC1` }],
								style: 'body',
							},
							{
								stack: [{ text: `11:00-12:00` }, { text: `SC1` }],
								style: 'body',
							},
							{
								stack: [{ text: `11:00-12:00` }, { text: `SC1` }],
								style: 'body',
							},
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ text: ``, style: 'body' },
						],
						[
							{ text: `SCC1012 A`, style: 'body' },
							{
								stack: [
									{ text: `04.00 IA (Inteligencia Ar)` },
									{ text: `SONIA MARTINEZ GUZMAN` },
								],
								style: 'body',
							},
							{ text: `P`, style: 'body' },
							{
								stack: [{ text: `` }, { text: `` }],
								style: 'body',
							},
							{
								stack: [{ text: `` }, { text: `` }],
								style: 'body',
							},
							{
								stack: [{ text: `14:00-15:00` }, { text: `H9` }],
								style: 'body',
							},
							{
								stack: [{ text: `14:00-15:00` }, { text: `H9` }],
								style: 'body',
							},
							{
								stack: [{ text: `14:00-15:00` }, { text: `H9` }],
								style: 'body',
							},
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ text: ``, style: 'body' },
						],
						[
							{ text: `SCC1019 A`, style: 'body' },
							{
								stack: [
									{ text: `04.00 Prog. Lógica y Func.` },
									{ text: `SYLFRA AVENDAÑO ROMERO` },
								],
								style: 'body',
							},
							{ text: `P`, style: 'body' },
							{
								stack: [{ text: `17:00-18:00` }, { text: `H2` }],
								style: 'body',
							},
							{
								stack: [{ text: `17:00-18:00` }, { text: `H2` }],
								style: 'body',
							},
							{
								stack: [{ text: `17:00-18:00` }, { text: `H2` }],
								style: 'body',
							},
							{
								stack: [{ text: `17:00-18:00` }, { text: `H2` }],
								style: 'body',
							},
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ text: ``, style: 'body' },
						],
						[
							{ text: ``, style: 'body' },
							{
								stack: [{ text: `` }, { text: `` }],
								style: 'body',
							},
							{ text: ``, style: 'body' },
							{
								stack: [{ text: `` }, { text: `` }],
								style: 'body',
							},
							{
								stack: [{ text: `` }, { text: `` }],
								style: 'body',
							},
							{
								stack: [{ text: `` }, { text: `` }],
								style: 'body',
							},
							{
								stack: [{ text: `` }, { text: `` }],
								style: 'body',
							},
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ stack: [{ text: `` }, { text: `` }], style: 'body' },
							{ text: ``, style: 'body' },
						],
					],
				},
			},
			// Standards
			{
				text: `NOTA: ACEPTO TODAS LAS CONDICIONES DEL REGLAMENTO PARA ALUMNOS DEL Instituto Tecnológico de Minatitlán
				LAS MATERIAS INDICADAS CON * NO CUMPLEN CON EL PERIODO REQUERIDO`,
				style: 'captionNote',
			},
			{
				stack: [
					{
						canvas: [
							{
								type: 'line',
								x1: 0,
								y1: 5,
								x2: 300,
								y2: 5,
								lineWidth: 1,
								lineColor: 'black',
							},
						],
						alignment: 'right',
					},
					{
						columns: [
							{ text: '', width: 100 },
							{
								text: 'TecNM-AC-PO-003-02',
								style: 'smallCaptionLetter',
								columnGap: 5,
							},
							{
								text: 'Rev. 0',
								style: 'smallCaptionLetter',
							},
						],
					},
				],
			},
			{
				canvas: [
					{
						type: 'line',
						x1: 0,
						y1: 5,
						x2: 200,
						y2: 5,
						lineWidth: 2,
						lineColor: 'black',
					},
				],
				style: 'departmentHeadSignature',
			},
			{
				stack: [
					{
						marginTop: 5,
						text: 'LIC SANDRA LUZ CRUZ ROMAN',
						style: 'departmentHeadSignature',
					},
					{
						text: 'JEFE DE LA DIVISION DE ESTUDIOS PROFESIONALES',
						style: 'departmentHeadSignature',
					},
				],
			},
			{
				text: 'C/A. CURSO (* Repite, E Especial) / ASISTENCIA (G Global)',
				style: 'notes',
			},
		],

		footer: (currentPage, pageCount) =>
			footerSection(currentPage, pageCount, {
				showSchoolarServiceFooter: false,
			}),
	};

	return docDefinition;
};
