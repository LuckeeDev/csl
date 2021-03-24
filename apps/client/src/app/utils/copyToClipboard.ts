export function copyToClipboard(value: string) {
	window.navigator.clipboard.writeText(value);
}
