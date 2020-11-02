import { Component, OnInit } from '@angular/core';
import { UploadService } from '@shared/services/upload/upload.service';
import { DialogService } from '@global/ui/services/dialog/dialog.service';
import { ToastrService } from '@global/ui/services/toastr/toastr.service';
import { MatSnackBarRef } from '@angular/material/snack-bar';

interface ICsvRes {
  success: boolean;
  duplicates?: string[];
}

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss'],
})
export class CsvComponent implements OnInit {
  ref: MatSnackBarRef<any>;

  constructor(
    public upload: UploadService,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  uploadCsv(file: string) {
    this.dialog
      .open({
        title: 'Sei sicuro?',
        text: `Il file "${file}" verrà caricato e creerà gli account per gli studenti della scuola`,
        answer: 'Conferma',
        color: 'primary',
      })
      .subscribe((res) => {
        this.upload.onCsvUpload().subscribe((res: ICsvRes) => {
          const { success, duplicates } = res;

          if (success === true) {
            this.toastr.show({
              message: 'Account creati',
              action: 'Chiudi',
              duration: 5000,
            });
          } else if (success === false && duplicates) {
            this.ref = this.toastr.show({
              message: `Mail duplicate trovate`,
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
