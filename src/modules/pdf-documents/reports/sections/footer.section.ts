import { Content /* ContextPageSize */ } from 'pdfmake/interfaces';

/********** IMPORTANT***************/
/* When enabling schoolarServiceInfo you should set the PageMarginBottom to 160 - 175  */
/* When using the normal footer (only the page count) you should set the PageMarginBottom to 50 and setting the schoolarServiceInfo to false */

/** TODO: Adjust to responsive design on landscape **/
const styles = {
	smallCaptionSchoolarService: {
		fontSize: 5,
		font: 'Roboto',
		bold: true,
	},
	contactSchoolarService: { fontSize: 8, alignment: 'right' },
};

const scholarServiceInfo: Content = {
	margin: [20, 0, 20, 0],
	table: {
		widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
		body: [
			// First section of academic information
			[
				{
					text: `LAS CALIFICACIONES QUE AMPARA EL PRESENTE DOCUMENTO,
					SERAN VALIDAS, PREVIO COTEJO DE LAS ACTAS CORRESPONDIENTES`,
					style: styles.smallCaptionSchoolarService,
					border: [false, false, false, false],
				},
				{
					text: `MAT.TOT: MATERIAS TOTALES
					MAT.CUR: MATERIAS CURSADAS
					MAT APR: MATERIAS APROBADAS
					MAT APR AC: MATERIAS APROBADAS COMO AC
					CRE.TOT: CRÉDITOS TOTALES`,
					style: styles.smallCaptionSchoolarService,
					border: [false, false, false, false],
				},
				{
					text: `CRE.ACU: CRÉDITOS ACUMULADOS
					CRE.CUR: CRÉDITOS CURSANDO
					PCTJE: PORCENTAJE DE CRÉDITOS
					NP.CONV: PERIODOS CONVALIDADOS
					NPRDO: NÚMERO DE PERIODO ACTUAL
					AC: ACREDITADA SIN VALOR NUMERICO`,
					style: styles.smallCaptionSchoolarService,
					border: [false, false, false, false],
				},
				{
					text: `CR: CRÉDITOS
					CAL: CALIFICACIÓN

					TC TIPO DE CALIFICACION: 1 ORDINARIO
					EV1A 2 ORDINARIO EV2A 4 REPITE EV1A 5
					REPITE EV2A 6 ESPECIAL EV1A 7 ESPECIAL
					EV2A 91 CONVALIDACION 92
					REVALIDACION 93 EQUIVALENCIA`,
					style: styles.smallCaptionSchoolarService,
					border: [false, false, false, false],
				},
				{
					text: `NIVEL DE DESEMPEÑO
					INS INSUFICIENTE
					SUF SUFICIENTE
					BUE BUENO
					NOT NOTABLE
					EXCELENTE`,
					style: styles.smallCaptionSchoolarService,
					border: [false, false, false, false],
				},
			],
			// Second section of academic information
			[
				{
					text: '',
					border: [false, false, false, true],
				},
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
			],
			[
				{
					text: 'ING ANA MARIA NARVAEZ HERNANDEZ',
					fontSize: 5,
					font: 'Roboto',
					bold: true,
					border: [false, false, false, false],
				},
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
			],
			[
				{
					text: 'JEFE DEL DEPARTAMENTO DE SERVICIOS ESCOLARES',
					fontSize: 6,
					font: 'Roboto',
					border: [false, false, false, false],
				},
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
			],
			// Third section of academic information
			[
				{
					text: 'Blvd. Institutos Tecnológicos No. 509 C.P. 96848, Col. Buena Vista Norte Minatitlán, Ver.',
					colSpan: 5,
					style: styles.contactSchoolarService,
					border: [false, false, false, false],
				},
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
			],
			[
				{ text: '', border: [false, false, false, false] },
				{
					text: [
						{ text: 'Tel. 922 202 7335 Ext. 311 ' },
						{
							text: 'www.minatitlan.tecnm.mx',
							style: { color: '#1B6296', decoration: 'underline' },
						},
					],
					colSpan: 4,
					style: styles.contactSchoolarService,
					border: [false, false, false, false],
				},
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
			],
			[
				{ text: '', border: [false, false, false, false] },
				{
					text: [
						{
							text: 'e-mail: se_minatitlan@tecnm.mx ',
						},
						{
							text: 'serviciosescolares@minatitlan.tecnm.mx',
							style: { color: '#1B6296', decoration: 'underline' },
						},
					],
					colSpan: 4,
					style: styles.contactSchoolarService,
					border: [false, false, false, false],
				},
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
				{ text: '', border: [false, false, false, false] },
			],
		],
	},
};

interface footerOptions {
	showSchoolarServiceFooter?: boolean;
}

export const footerSection = (
	currentPage: number,
	pageCount: number,
	options: footerOptions,
	// pageSize: ContextPageSize,
): Content => {
	const { showSchoolarServiceFooter = true } = options;

	const schoolarInfoFooter: Content = showSchoolarServiceFooter
		? scholarServiceInfo
		: null;

	const footerPageNumber: Content = {
		text: `Página ${currentPage} de ${pageCount}`,
		alignment: 'right',
		fontSize: 8,
		bold: true,
		margin: [0, 10, 35, 0],
	};

	return { stack: [schoolarInfoFooter, footerPageNumber] };
};
