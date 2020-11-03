import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialogData } from '@csl/shared';
import { DialogComponent } from '@global/ui/components/dialog/dialog.component';
import { filter } from 'rxjs/operators';

@Injectable()
export class DialogService {
  constructor(public dialogService: MatDialog) {}

  open(data: IDialogData) {
    const dialogRef = this.dialogService.open(DialogComponent, {
      data,
      panelClass: 'dialog-padding'
    });

    return dialogRef.afterClosed().pipe(filter((x) => x === true));
  }
}
