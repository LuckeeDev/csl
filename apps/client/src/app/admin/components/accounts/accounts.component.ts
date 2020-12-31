import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';
import { switchMap } from 'rxjs/operators';
import { isClassID } from '@global/validators';
import { MembersService } from '@shared/services/members/members.service';

@Component({
  selector: 'csl-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  accountForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    classID: new FormControl('', [Validators.required, isClassID]),
  });

  constructor(
    private dialog: DialogService,
    private members: MembersService,
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
      .pipe(switchMap(() => this.members.createAccount(this.accountForm.value)))
      .subscribe((res) => {
        if (res.success) {
          this.toastr.show({
            message: 'Account creato',
            color: 'success',
          });

          formElement.resetForm();
          this.accountForm.reset();
        } else if (res.success) {
          this.toastr.showError();
        }
      });
  }
}
