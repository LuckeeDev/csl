import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '@global/ui/services/dialog/dialog.service';
import { SnacksService } from '@global/services/snacks/snacks.service';
import { ToastrService } from '@global/ui/services/toastr/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-snack',
  templateUrl: './create-snack.component.html',
  styleUrls: ['./create-snack.component.scss'],
})
export class CreateSnackComponent implements OnInit {
  snackForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    maxQuantity: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: DialogService,
    private toastr: ToastrService,
    private snacks: SnacksService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.dialog
      .open({
        title: 'Confermi il prodotto?',
        answer: 'Sì, conferma',
        color: 'primary',
        text: 'Non potrai più modificare questo prodotto, ma solo eliminarlo',
      })
      .subscribe((res) => {
        const form = this.snackForm.value;

        const { name } = form;
        const id = name.toLowerCase().replace(/ /g, '-');

        this.snacks.createSnack({ ...form, id }).subscribe((res) => {
          this.toastr.show({
            message: 'Prodotto creato con successo',
            action: 'Chiudi',
            duration: 5000,
          });

          this.router.navigate(['bar-admin', 'manage']);
        });
      });
  }
}
