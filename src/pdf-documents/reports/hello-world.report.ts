import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection, watermarkSection } from './sections';
import { commonHeaderSection } from './sections/headers';

const tecnmLogoPath = 'src/pdf-documents/assets/tecnmLogo.png';

interface ReportOptions {
	name: string;
}

export const getHelloWorldReport = (
	options: ReportOptions,
): TDocumentDefinitions => {
	const { name } = options;

	const docDefinition: TDocumentDefinitions = {
		pageMargins: [40, 110, 40, 40],
		header: commonHeaderSection({}),
		background: watermarkSection({
			image: tecnmLogoPath,
			alignment: 'center',
			opacity: 0.5,
			width: 400,
			margin: [0, 120, 0, 0],
		}),

		content: [`Hola ${name}`],

		footer: (currentPage, pageCount) =>
			footerSection(currentPage, pageCount, {
				showSchoolarServiceFooter: false,
			}),
	};

	return docDefinition;
};
