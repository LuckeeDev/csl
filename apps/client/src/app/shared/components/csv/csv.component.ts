import { Component } from '@angular/core';
import { UploadService } from '@shared/services/upload/upload.service';
import { DialogService, ToastrService } from '@csl/ui';
import { MatSnackBarRef } from '@angular/material/snack-bar';

interface ICsvRes {
  success: boolean;
  duplicates?: string[];
}

@Component({
  selector: 'csl-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss'],
})
export class CsvComponent {
  ref: MatSnackBarRef<any>;

  constructor(
    public upload: UploadService,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {}

  uploadCsv(file: string) {
    this.dialog
      .open({
        title: 'Sei sicuro?',
        text: `Il file "${file}" verrà caricato e creerà gli account per gli studenti della scuola`,
        answer: 'Conferma',
        color: 'primary',
      })
      .subscribe(() => {
        this.upload.onCsvUpload().subscribe((res: ICsvRes) => {
          const { success, duplicates } = res;

          if (success === true) {
            this.toastr.show({
              message: 'Account creati',
              color: 'success',
              action: 'Chiudi',
              duration: 5000,
            });
          } else if (success === false && duplicates) {
            this.ref = this.toastr.show({
              message: `Mail duplicate trovate`,
              color: 'warn',
              action: 'Copia email',
              duration: 15000,
            });

            this.ref.onAction().subscribe(() => {
              window.navigator.clipboard.writeText(duplicates.toString());
            });
          }
        });
      });
  }
}
