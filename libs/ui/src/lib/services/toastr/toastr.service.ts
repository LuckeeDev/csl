import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { IToastrData } from '@csl/shared';

@Injectable()
export class ToastrService {
	constructor(private snackBar: MatSnackBar) {}

	show(data: IToastrData): MatSnackBarRef<any> {
		return this.snackBar.open(data.message, data.action || 'Chiudi', {
			duration: data.duration || 5000,
			panelClass: `toastr-${data.color}`,
		});
	}

	showError(err?: string): MatSnackBarRef<any> {
		return this.snackBar.open(
			err ?? 'Sembra che ci sia stato un errore, riprovare più tardi',
			'Chiudi',
			{
				duration: 5000,
				panelClass: 'toastr-warn',
			}
		);
	}
}
