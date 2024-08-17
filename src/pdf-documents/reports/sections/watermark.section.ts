import { Content } from 'pdfmake/interfaces';

interface watermarkOptions {
	image: string;
	opacity: number;
	alignment: 'justify' | 'left' | 'center' | 'right';
	width: number;
	margin: [number, number, number, number];
}

export const watermarkSection = (options: watermarkOptions): Content => {
	const { image, opacity, width, alignment, margin } = options;

	return {
		image: image,
		opacity: opacity,
		width: width,
		alignment: alignment,
		margin: margin,
	};
};
