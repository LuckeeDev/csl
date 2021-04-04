import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISnack } from '@csl/shared';
import { SnacksService } from '@global/services/snacks/snacks.service';
import { DialogService, ToastrService } from '@csl/ui';

@Component({
  selector: 'csl-snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.scss'],
})
export class SnacksComponent implements OnInit {
  snacks: Observable<ISnack[]>;

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
      .subscribe(() => {
        this.snacksService.addToCart(id).subscribe((res) => {
          if (res.success === true) {
            this.toastr.show({
              message: 'Articolo aggiunto',
              color: 'success',
              action: 'Chiudi',
              duration: 5000,
            });

            this.snacks = this.snacksService.getSnacks();
          } else if (res.success === false && res.code === 'order-confirmed') {
            this.toastr.show({
              message: 'Hai già confermato il tuo ordine!',
              color: 'accent',
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
