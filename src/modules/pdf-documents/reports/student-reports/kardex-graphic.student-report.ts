import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { kardexGraphicHeaderSection } from '../sections/headers';
import { footerSection } from '../sections';

const styles: StyleDictionary = {
	semester: {
		fontSize: 8,
		font: 'Roboto',
		bold: true,
		alignment: 'left',
		color: 'white',
		fillColor: '#BC955C',
	},
	subjectKey: {
		fontSize: 7,
		font: 'Roboto',
		bold: true,
		alignment: 'left',
	},
	subjectName: {
		fontSize: 7,
		font: 'Roboto',
		bold: true,
		alignment: 'center',
	},
	subjectData: {
		fontSize: 7,
		font: 'Roboto',
		bold: true,
		alignment: 'center',
	},
	subjectContainer: {
		lineHeight: 1.2,
	},
};

interface KardexColors {
	subjectTaken: '#4FB5FF';
	subjectBeingStudied: '#248232';
	untautghtSubject: 'white';
	subjectTakenOnRepeat: '#08317B';
	subjectOnRepeat: '#FFD300';
	subjectOnSpecial: '#FF7F00';
	subjectInSummerCourse: 'white';
	permanentDischarge: '#D10C0C';
	load: '#b2e799';
}

export const getKardexGraphicReport = (): TDocumentDefinitions => {
	const docDefinition: TDocumentDefinitions = {
		styles: styles,

		pageMargins: [25, 120, 25, 40],
		pageOrientation: 'landscape',
		header: kardexGraphicHeaderSection(),

		content: [
			{
				layout: 'noBorders',
				table: {
					widths: [
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
							{
								table: {
									widths: [70],
									heights: function (row) {
										if (row === 0) {
											return 'auto'; // Altura de la primera fila
										}
										return 50; // Altura de las demás filas
									},
									body: [
										[{ text: `01`, style: 'semester' }],
										[
											{
												stack: [
													{ text: `ACF0901`, style: 'subjectKey' },
													{
														text: `CALCULO DIF.`,
														style: 'subjectName',
													},
													{ text: `91 2 2203`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `ACF0901`, style: 'subjectKey' },
													{
														text: `FUND. PROGRAMACIÓN`,
														style: 'subjectName',
													},
													{ text: `78 2 2203`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `ACA0907`, style: 'subjectKey' },
													{
														text: `TALLER DE ETICA`,
														style: 'subjectName',
													},
													{ text: `86 1 2203`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `AEF1041`, style: 'subjectKey' },
													{
														text: `MATEM. DISCRETAS`,
														style: 'subjectName',
													},
													{ text: `91 2 2203`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCH1024`, style: 'subjectKey' },
													{
														text: `TALLER ADM.`,
														style: 'subjectName',
													},
													{ text: `78 1 2203`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `ACC0906`, style: 'subjectKey' },
													{
														text: `FUND. INVESTIGACION`,
														style: 'subjectName',
													},
													{ text: `94 1 2203`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
									],
								},
							},
							{
								table: {
									widths: [70],
									heights: function (row) {
										if (row === 0) {
											return 'auto'; // Altura de la primera fila
										}
										return 50; // Altura de las demás filas
									},
									body: [
										[{ text: `02`, style: 'semester' }],
										[
											{
												stack: [
													{ text: `ACF0902`, style: 'subjectKey' },
													{
														text: `CALCULO INTEGRAL`,
														style: 'subjectName',
													},
													{ text: `100 1 2211`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `AED1286`, style: 'subjectKey' },
													{
														text: `PROG. OBJETOS`,
														style: 'subjectName',
													},
													{ text: `76 2 2211`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `AEC1008`, style: 'subjectKey' },
													{
														text: `CONT. FINANCIERA`,
														style: 'subjectName',
													},
													{ text: `85 2 2211`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `AEC1058`, style: 'subjectKey' },
													{
														text: `QUIMICA`,
														style: 'subjectName',
													},
													{ text: `99 1 2211`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `ACF0903`, style: 'subjectKey' },
													{
														text: `ALGEBRA LINEAL`,
														style: 'subjectName',
													},
													{ text: `96 1 2211`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `AEF1052`, style: 'subjectKey' },
													{
														text: `PROB. Y ESTADISTICA`,
														style: 'subjectName',
													},
													{ text: `94 1 2211`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
									],
								},
							},
							{
								table: {
									widths: [70],
									heights: function (row) {
										if (row === 0) {
											return 'auto'; // Altura de la primera fila
										}
										return 50; // Altura de las demás filas
									},
									body: [
										[{ text: `03`, style: 'semester' }],
										[
											{
												stack: [
													{ text: `ACF0904`, style: 'subjectKey' },
													{
														text: `CALCULO VECTORIAL`,
														style: 'subjectName',
													},
													{ text: `100 1 2213`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `AED1026`, style: 'subjectKey' },
													{
														text: `ESTRUCTURA DE DATOS`,
														style: 'subjectName',
													},
													{ text: `90 1 2213`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCC1005`, style: 'subjectKey' },
													{
														text: `CULTURA EMPRESARIAL`,
														style: 'subjectName',
													},
													{ text: `96 1 2213`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCC1013`, style: 'subjectKey' },
													{
														text: `INV. OPERACIONES`,
														style: 'subjectName',
													},
													{ text: `100 1 2213`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `ACD0908`, style: 'subjectKey' },
													{
														text: `DES. SUSTENTABLE`,
														style: 'subjectName',
													},
													{ text: `100 1 2213`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCF1006`, style: 'subjectKey' },
													{
														text: `FISICA GENERAL`,
														style: 'subjectName',
													},
													{ text: `97 1 2213`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
									],
								},
							},
							{
								table: {
									widths: [70],
									heights: function (row) {
										if (row === 0) {
											return 'auto'; // Altura de la primera fila
										}
										return 50; // Altura de las demás filas
									},
									body: [
										[{ text: `04`, style: 'semester' }],
										[
											{
												stack: [
													{ text: `ACF0905`, style: 'subjectKey' },
													{
														text: `ECUACIONES DIF.`,
														style: 'subjectName',
													},
													{ text: `85 2 2221`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCC1017`, style: 'subjectKey' },
													{
														text: `MÉTODOS NUMÉRICOS`,
														style: 'subjectName',
													},
													{ text: `96 1 2221`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCD1027`, style: 'subjectKey' },
													{
														text: `TÓP. AVANZ. PROG.`,
														style: 'subjectName',
													},
													{ text: `93 2 2221`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `AEF1031`, style: 'subjectKey' },
													{
														text: `FUND. BD`,
														style: 'subjectName',
													},
													{ text: `95 1 2221`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCD1022`, style: 'subjectKey' },
													{
														text: `SIMULACIÓN`,
														style: 'subjectName',
													},
													{ text: `96 1 2221`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCD1018`, style: 'subjectKey' },
													{
														text: `PRINC. ELÉCT. Y APL.`,
														style: 'subjectName',
													},
													{ text: `96 1 2221`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
									],
								},
							},
							{
								table: {
									widths: [70],
									heights: function (row) {
										if (row === 0) {
											return 'auto'; // Altura de la primera fila
										}
										return 50; // Altura de las demás filas
									},
									body: [
										[{ text: `05`, style: 'semester' }],
										[
											{
												stack: [
													{ text: `SCC1010`, style: 'subjectKey' },
													{
														text: `GRAFICACION`,
														style: 'subjectName',
													},
													{ text: `95 1 2223`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `AEC1034`, style: 'subjectKey' },
													{
														text: `FUND. TELECOM.`,
														style: 'subjectName',
													},
													{ text: `100 1 2223`, style: 'subjectData' },
													,
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `AEC1061`, style: 'subjectKey' },
													{
														text: `SISTEMAS OPERATIVOS I`,
														style: 'subjectName',
													},
													{ text: `89 1 2223`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCA1025`, style: 'subjectKey' },
													{
														text: `TALLER BD`,
														style: 'subjectName',
													},
													{ text: `90 1 2231`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCC1007`, style: 'subjectKey' },
													{
														text: `FUND. ING. SOFTWARE`,
														style: 'subjectName',
													},
													{ text: `95 1 2223`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCD1003`, style: 'subjectKey' },
													{
														text: `ARQ. COMP.`,
														style: 'subjectName',
													},
													{ text: `100 1 2223`, style: 'subjectData' },
													,
												],
												style: 'subjectContainer',
											},
										],
									],
								},
							},
							{
								table: {
									widths: [70],
									heights: function (row) {
										if (row === 0) {
											return 'auto'; // Altura de la primera fila
										}
										return 50; // Altura de las demás filas
									},
									body: [
										[{ text: `06`, style: 'semester' }],
										[
											{
												stack: [
													{ text: `SCD1015`, style: 'subjectKey' },
													{
														text: `LENG. AUTÓMATAS I`,
														style: 'subjectName',
													},
													{ text: `100 1 2231`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCD1021`, style: 'subjectKey' },
													{
														text: `REDES COMP.`,
														style: 'subjectName',
													},
													{ text: `96 1 2231`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCA1026`, style: 'subjectKey' },
													{
														text: `TALLER SIST. OP.`,
														style: 'subjectName',
													},
													{ text: `99 1 2231`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCB1001`, style: 'subjectKey' },
													{
														text: `ADM. BD`,
														style: 'subjectName',
													},
													{ text: `85 2 2241`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCD1011`, style: 'subjectKey' },
													{
														text: `ING. SOFTWARE`,
														style: 'subjectName',
													},
													{ text: `91 1 2231`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCC1014`, style: 'subjectKey' },
													{
														text: `LENG. INTERFAZ`,
														style: 'subjectName',
													},
													{ text: `98 1 2231`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
									],
								},
							},
							{
								table: {
									widths: [70],
									heights: function (row) {
										if (row === 0) {
											return 'auto'; // Altura de la primera fila
										}
										return 50; // Altura de las demás filas
									},
									body: [
										[{ text: `07`, style: 'semester' }],
										[
											{
												stack: [
													{ text: `SCD1016`, style: 'subjectKey' },
													{
														text: `LyA II`,
														style: 'subjectName',
													},
													{ text: `96 1 2233`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCD1004`, style: 'subjectKey' },
													{
														text: `CERD`,
														style: 'subjectName',
													},
													{ text: `82 2 2233`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `ACA0909`, style: 'subjectKey' },
													{
														text: `TALLER DE INV. I`,
														style: 'subjectName',
													},
													{ text: `98 1 2233`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `CEG2201`, style: 'subjectKey' },
													{
														text: `Fund De Comp En La N`,
														style: 'subjectName',
													},
													{ text: `99 1 2233`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCG1009`, style: 'subjectKey' },
													{
														text: `GPS`,
														style: 'subjectName',
													},
													{ text: `88 1 2233`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCC1023`, style: 'subjectKey' },
													{
														text: `SIS. PROGRAMABLES`,
														style: 'subjectName',
													},
													{ text: `76 1 2231`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `ISE9`, style: 'subjectKey' },
													{
														text: `ACT. COMPLEMENTARIAS`,
														style: 'subjectName',
													},
													{ text: `EXC 1 2233`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
									],
								},
							},
							{
								table: {
									widths: [70],
									heights: function (row) {
										if (row === 0) {
											return 'auto'; // Altura de la primera fila
										}
										return 50; // Altura de las demás filas
									},
									body: [
										[{ text: `08`, style: 'semester' }],
										[
											{
												stack: [
													{ text: `SCC1019`, style: 'subjectKey' },
													{
														text: `PROGR. LÓGICA Y FUNC.`,
														style: 'subjectName',
													},
													{ text: `97 1 2241`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCA1002`, style: 'subjectKey' },
													{
														text: `ADM. DE REDES`,
														style: 'subjectName',
													},
													{ text: `99 1 2241`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `CEG2202`, style: 'subjectKey' },
													{
														text: `ARQ DE SOL EN LA NUB`,
														style: 'subjectName',
													},
													{ text: `99 1 2241`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `AEB1055`, style: 'subjectKey' },
													{
														text: `PROG. WEB`,
														style: 'subjectName',
													},
													{ text: `98 1 2241`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `ACA0910`, style: 'subjectKey' },
													{
														text: `TALLER DE INV. II`,
														style: 'subjectName',
													},
													{ text: `96 1 2241`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `ISD9`, style: 'subjectKey' },
													{
														text: `SERVICIO SOCIAL`,
														style: 'subjectName',
													},
													{ text: ``, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
									],
								},
							},
							{
								table: {
									widths: [70],
									heights: function (row) {
										if (row === 0) {
											return 'auto'; // Altura de la primera fila
										}
										return 50; // Altura de las demás filas
									},
									body: [
										[{ text: `09`, style: 'semester' }],
										[
											{
												stack: [
													{ text: `CEg2203`, style: 'subjectKey' },
													{
														text: `HERRAM DE SOFT EN LA`,
														style: 'subjectName',
													},
													{ text: ``, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `CEM2204`, style: 'subjectKey' },
													{
														text: `ADMON DE COMP EN LA`,
														style: 'subjectName',
													},
													{ text: ``, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `SCC1012`, style: 'subjectKey' },
													{
														text: `IA (Inteligencia Ar)`,
														style: 'subjectName',
													},
													{ text: `99 1 2241`, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
										[
											{
												stack: [
													{ text: `ISC9`, style: 'subjectKey' },
													{
														text: `RESIDENCIA`,
														style: 'subjectName',
													},
													{ text: ``, style: 'subjectData' },
												],
												style: 'subjectContainer',
											},
										],
									],
								},
							},
						],
					],
				},
			},
		],

		footer: (currentPage, pageCount) =>
			footerSection(currentPage, pageCount, {
				showSchoolarServiceFooter: false,
			}),
	};

	return docDefinition;
};
