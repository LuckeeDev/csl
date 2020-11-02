import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '@global/ui/services/dialog/dialog.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  isLinear = false;
  form: FormGroup;

  categories: string[] = ['Tecnico', 'Visivo', 'Altro'];

  constructor(private fb: FormBuilder, private dialog: DialogService) {}

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
        console.log(this.form.value);
      });
  }
}
