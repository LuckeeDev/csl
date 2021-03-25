export function findDuplicates(array: string[]) {
	const object = {};
	const result = [];

	array.forEach((item) => {
		if (!object[item]) object[item] = 0;
		object[item] += 1;
	});

	for (const prop in object) {
		if (object[prop] >= 2) {
			result.push(prop);
		}
	}

	return result;
}
