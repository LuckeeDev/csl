import { AdminService } from '@admin/services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';
import { map, switchMap } from 'rxjs/operators';
import { ICommissione } from '@csl/shared';

@Component({
  selector: 'csl-commissioni',
  templateUrl: './commissioni.component.html',
  styleUrls: ['./commissioni.component.scss'],
})
export class CommissioniComponent implements OnInit {
  commissioni: ICommissione[];
  displayedColumns = ['id', 'title', 'hasPage', 'manage'];

  commissioneForm = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
  });

  constructor(
    private dialog: DialogService,
    private toastr: ToastrService,
    private admin: AdminService,
  ) {}

  ngOnInit(): void {
    this.admin
      .getCommissioni()
      .pipe(map((res) => res.data))
      .subscribe((commissioni) => (this.commissioni = commissioni));
  }

  createCommissione(formElement: FormGroupDirective) {
    this.dialog
      .open({
        title: 'Confermi la creazione della Commissione?',
        answer: 'Sì, conferma',
        color: 'primary',
        text: 'Potrai modificarla in seguito',
      })
      .pipe(
        switchMap(() =>
          this.admin.createCommissione(this.commissioneForm.value)
        )
      )
      .subscribe((res) => {
        if (res.success) {
          this.commissioni = res.data;

          this.toastr.show({
            color: 'success',
            message: `Commissione "${this.commissioneForm.value.id}" creata`,
          });

          this.commissioneForm.reset();
          formElement.reset();
        } else {
          this.toastr.showError();
        }
      });
  }

  removeCommissione(id: ICommissione['id']) {
    this.dialog
      .open({
        title: 'Sei sicuro?',
        text: 'Tutti i dati della Commissione saranno persi',
        color: 'warn',
        answer: 'Sì, conferma',
      })
      .pipe(switchMap(() => this.admin.removeCommissione(id)))
      .subscribe((res) => {
        if (res.success) {
          this.commissioni = res.data;

          this.toastr.show({
            color: 'warn',
            message: `Commissione "${id}" rimossa`,
          });
        } else {
          this.toastr.showError();
        }
      });
  }
}
