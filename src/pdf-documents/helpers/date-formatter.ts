export class DateFormatter {
	static formatter = new Intl.DateTimeFormat('es-ES', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	static getYYYYMMDD(date: Date): string {
		const parts = this.formatter.formatToParts(date);
		const day = parts.find((part) => part.type === 'day').value;
		const month = parts.find((part) => part.type === 'month').value;
		const year = parts.find((part) => part.type === 'year').value;
		return `${year}-${month}-${day}`;
	}
}
