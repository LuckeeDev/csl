import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '@csl/shared';

@Component({
	selector: 'csl-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
	inputValue: FormControl;

	constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData) {}

	ngOnInit() {
		if (this.data.hasInput) {
			const validators = [
				Validators.required,
				...(this.data.inputPattern
					? [Validators.pattern(this.data.inputPattern)]
					: []),
			];

			this.inputValue = new FormControl('', validators);
		}
	}
}
