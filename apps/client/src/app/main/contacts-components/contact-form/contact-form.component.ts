import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';
import { IBugData } from '@csl/shared';
import { ReportsService } from '@global/services/reports/reports.service';
import { Router } from '@angular/router';
import { AuthService } from '@global/services/auth/auth.service';
import { isClassID } from '@global/validators';

@Component({
  selector: 'csl-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  isLinear = false;
  form: FormGroup;

  isSignedIn: boolean;

  categories: string[] = ['Tecnico', 'Visivo', 'Altro'];

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private toastr: ToastrService,
    private reports: ReportsService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstStep: this.fb.group({
        category: ['', Validators.required],
      }),
      secondStep: this.fb.group({
        description: ['', Validators.required],
        context: ['', Validators.required],
      }),
      contactInfo: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        classID: ['', [Validators.required, isClassID]],
      }),
    });

    this.auth.user$.subscribe((user) => {
      if (user) {
        this.isSignedIn = true;

        this.form.removeControl('contactInfo');
      } else {
        this.isSignedIn = false;
      }
    });
  }

  log() {
    console.log(this.form.value);
  }

  submit() {
    this.dialog
      .open({
        title: 'Confermare invio modulo?',
        text: 'Riceverai una notifica appena risolveremo il problema segnalato',
        answer: 'Conferma',
        color: 'primary',
      })
      .subscribe(() => {
        const { firstStep, secondStep } = this.form.value;

        const bugData: IBugData = {
          ...firstStep,
          ...secondStep,
        };

        const contactInfo =
          this.isSignedIn === false ? this.form.value.contactInfo : null;

        this.reports.sendBugReport(bugData, contactInfo).subscribe((res) => {
          if (res.success === true) {
            this.toastr.show({
              message: 'Segnalazione inviata',
              color: 'success',
            });
          } else if (res.success === false) {
            this.toastr.showError();
          }

          this.router.navigate(['..', 'contacts']);
        });
      });
  }
}
