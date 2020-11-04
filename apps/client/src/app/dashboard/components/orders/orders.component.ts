import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrdersService } from '@global/services/orders/orders.service';
import { DialogService, ToastrService } from '@csl/ui';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  category: string;
  displayedColumns: string[];

  constructor(
    private activated: ActivatedRoute,
    private dialog: DialogService,
    private toastr: ToastrService,
    public orders: OrdersService
  ) {}

  ngOnInit(): void {
    this.activated.paramMap.subscribe((params) => {
      this.category = params.get('category');

      this.displayedColumns =
        this.category === 'gadgets'
          ? ['name', 'quantity', 'size', 'color']
          : ['name', 'quantity'];
    });

    if (!this.orders[this.category]) {
      this.orders.getOrders();
    }
  }

  // Delete an order and handle response (in the UI)
  deleteOrder(product) {
    this.dialog
      .open({
        title:
          'Sei sicuro di voler eliminare questo prodotto dal tuo carrello?',
        text: 'Potrai comunque riordinarlo in seguito',
        color: 'warn',
        answer: 'Conferma',
      })
      .subscribe((res) => {
        this.orders.deleteProduct(product).subscribe((res) => {
          let { err, success } = res;
          if (
            success === false &&
            err === 'Your order has already been confirmed'
          ) {
            this.toastr.show({
              message: 'Ordine già confermato',
              color: 'accent',
              action: 'Chiudi',
              duration: 5000,
            });
          } else if (success === false) {
            this.toastr.showError();
          } else {
            this.toastr.show({
              message: 'Ordine cancellato',
              color: 'accent',
              action: 'Chiudi',
              duration: 5000,
            });
          }
        });
      });
  }

  confirmOrder() {
    this.dialog
      .open({
        title: 'Sei sicuro di voler confermare il tuo ordine?',
        text: 'Se confermi, non potrai più effettuare modifiche',
        color: 'primary',
        answer: 'Conferma',
      })
      .subscribe((res) => {
        this.orders.confirmOrder(this.category).subscribe((res) => {
          let { success } = res;

          if (success === true) {
            this.toastr.show({
              message: 'Ordine confermato',
              color: 'success',
              action: 'Chiudi',
              duration: 5000,
            });
          } else if (success === false) {
            this.toastr.showError();
          }

          this.orders.getOrders();
        });
      });
  }
}
