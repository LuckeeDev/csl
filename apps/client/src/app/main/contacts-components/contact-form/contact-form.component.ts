import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';
import { IBugData } from '@csl/shared';
import { ReportsService } from '@global/services/reports/reports.service';
import { Router } from '@angular/router';

@Component({
  selector: 'csl-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  isLinear = false;
  form: FormGroup;

  categories: string[] = ['Tecnico', 'Visivo', 'Altro'];

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private toastr: ToastrService,
    private reports: ReportsService,
    private router: Router
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
    });
  }

  submit() {
    this.dialog
      .open({
        title: 'Confermare invio modulo?',
        text:
          'I tuoi dati non saranno condivisi con nessuno e riceverai una notifica appena sistemeremo il problema segnalato',
        answer: 'Conferma',
        color: 'primary',
      })
      .subscribe(() => {
        const { firstStep, secondStep } = this.form.value;

        const bugData: IBugData = {
          category: firstStep.category,
          description: secondStep.description,
          context: secondStep.context,
        };

        this.reports.sendBugReport(bugData).subscribe((res) => {
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
