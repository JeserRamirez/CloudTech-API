export const getPeriod = (fecha: Date): string => {
	const year = fecha.getFullYear();
	const month = fecha.getMonth() + 1; // Los meses en JavaScript empiezan desde 0

	let periodo = '';

	switch (month) {
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			periodo = 'FEBJUN'; // Febrero a Junio
			break;
		case 7:
		case 8:
			periodo = 'JULAGO'; // Julio a Agosto (verano)
			break;
		case 9:
		case 10:
		case 11:
		case 12:
			periodo = 'AGODIC'; // Agosto a Diciembre
			break;
		default:
			throw new Error('Mes fuera de rango');
	}

	return `${periodo}${year}`;
};
