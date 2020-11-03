import { AdminService } from '@admin/services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';

const isClassID = (c: AbstractControl) => {
  let CLASSID_REGEXP: RegExp = /^[0-9]{1}[A-Z]{1}/;

  return CLASSID_REGEXP.test(c.value)
    ? null
    : {
        classID: {
          valid: false,
        },
      };
};

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  accountForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    classID: new FormControl('', [
      Validators.required,
      isClassID,
      Validators.maxLength(2),
      Validators.minLength(2),
    ]),
  });

  removeEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private dialog: DialogService,
    private admin: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  createAccount(formElement: FormGroupDirective) {
    this.dialog
      .open({
        title: 'Aggiungere account?',
        text: `Verrà aggiunto un account associato alla mail ${this.accountForm.value.email}`,
        color: 'primary',
        answer: 'Aggiungi',
      })
      .subscribe(() => {
        this.admin.createAccount(this.accountForm.value).subscribe((res) => {
          if (res.success) {
            this.toastr.show({
              message: 'Account creato',
              color: 'success',
            });
          } else if (res.success) {
            this.toastr.showError();
          }

          this.accountForm.reset();
          formElement.reset();
        });
      });
  }

  removeAccount() {
    this.dialog
      .open({
        title: 'Rimuovere account?',
        text: `L'account associato alla mail ${this.removeEmail.value} sarà eliminato e con esso tutti i suoi dati`,
        color: 'accent',
        answer: 'Sì, rimuovi',
      })
      .subscribe(() => {
        this.admin.removeAccount(this.removeEmail.value).subscribe((res) => {
          if (res.success) {
            this.toastr.show({
              message: 'Account rimosso',
              color: 'accent',
            });
          } else if (res.success) {
            this.toastr.showError();
          }

          this.removeEmail.reset();
        });
      });
  }
}
