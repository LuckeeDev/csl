import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialogData } from '@csl/shared';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { filter } from 'rxjs/operators';

@Injectable()
export class DialogService {
	constructor(private dialogService: MatDialog) {}

	open(data: IDialogData) {
		const dialogRef = this.dialogService.open(DialogComponent, {
			data,
			panelClass: 'dialog-padding',
			disableClose: data.disableClose || false,
		});

		return dialogRef.afterClosed().pipe(filter((x) => x === true));
	}
}
