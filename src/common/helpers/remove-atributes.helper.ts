export const removeAttributes = (data: any, attributesToRemove: string[]) => {
	if (!data) return data;

	const clonedData = JSON.parse(JSON.stringify(data)); // Clonar el objeto o array para evitar modificar el original

	const deleteAttributesRecursively = (item: any) => {
		if (Array.isArray(item)) {
			item.forEach((subItem) => deleteAttributesRecursively(subItem));
		} else if (typeof item === 'object' && item !== null) {
			attributesToRemove.forEach((attr) => delete item[attr]);
			Object.values(item).forEach((value) =>
				deleteAttributesRecursively(value),
			);
		}
	};

	deleteAttributesRecursively(clonedData);

	return clonedData;
};
