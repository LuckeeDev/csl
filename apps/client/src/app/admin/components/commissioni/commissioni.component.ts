import { AdminService } from '@admin/services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'csl-commissioni',
  templateUrl: './commissioni.component.html',
  styleUrls: ['./commissioni.component.scss'],
})
export class CommissioniComponent implements OnInit {
  commissioneForm = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
  });

  constructor(
    private dialog: DialogService,
    private toastr: ToastrService,
    private admin: AdminService
  ) {}

  ngOnInit(): void {}

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
}
