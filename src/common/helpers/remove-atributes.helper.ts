export const removeAttributes = (data: any, attributesToRemove: string[]) => {
	if (!data) return data;

	if (Array.isArray(data)) {
		return data.map((item) => {
			attributesToRemove.forEach((attr) => delete item[attr]);
			return item;
		});
	}

	if (typeof data === 'object') {
		attributesToRemove.forEach((attr) => delete data[attr]);
		return data;
	}

	return data;
};
