import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISnack } from '@csl/shared';
import { SnacksService } from '@global/services/snacks/snacks.service';
import { ToastrService } from '@global/ui/services/toastr/toastr.service';
import { DialogService } from '@global/ui/services/dialog/dialog.service';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.scss'],
})
export class SnacksComponent implements OnInit {
  snacks: Observable<ISnack[]>;
  faPlus = faPlus;

  constructor(
    private snacksService: SnacksService,
    private toastr: ToastrService,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.snacks = this.snacksService.getSnacks();
  }

  // Add snack to cart
  addToCart(id: ISnack['id']) {
    this.dialog
      .open({
        title: 'Aggiungere prodotto al carrello?',
        text: 'Potrai comunque rimuoverlo in seguito',
        answer: 'Aggiungi',
        color: 'primary',
      })
      .subscribe((res) => {
        this.snacksService.addToCart(id).subscribe((res) => {
          if (res.success === true) {
            this.toastr.show({
              message: 'Articolo aggiunto',
              action: 'Chiudi',
              duration: 5000,
            });

            this.snacks = this.snacksService.getSnacks();
          } else if (res.success === false && res.code === 'order-confirmed') {
            this.toastr.show({
              message: 'Hai già confermato il tuo ordine!',
              action: 'Chiudi',
              duration: 5000,
            });
          } else {
            this.toastr.showError();
          }
        });
      });
  }
}
