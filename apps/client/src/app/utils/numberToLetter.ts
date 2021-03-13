export function numberToLetter<T extends string>(num: number): T {
	return String.fromCharCode(65 + num).toLowerCase() as T;
}
