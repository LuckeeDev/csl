export interface IDialogData {
	title: string;
	text: string;
	color: 'primary' | 'accent' | 'warn';
	answer: string;
	disableClose?: boolean;
	hasInput?: boolean;
	inputLabel?: string;
	inputType?: 'text' | 'number';
	inputPattern?: RegExp;
}
