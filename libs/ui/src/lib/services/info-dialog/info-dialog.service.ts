import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
	InfoDialogComponent,
	InfoDialogData,
} from '../../components/info-dialog/info-dialog.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class InfoDialogService {
	constructor(private dialog: MatDialog) {}

	open(data: InfoDialogData): Observable<boolean> {
		const dialogRef = this.dialog.open(InfoDialogComponent, {
			data,
		});

		return dialogRef
			.afterClosed()
			.pipe(map((res) => (res === true ? true : false)));
	}
}
