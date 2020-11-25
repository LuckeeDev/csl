import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrdersService } from '@global/services/orders/orders.service';
import { DialogService, ToastrService } from '@csl/ui';

@Component({
  selector: 'csl-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  category: string;
  displayedColumns: string[];

  constructor(
    private dialog: DialogService,
    private toastr: ToastrService,
    public orders: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.category = this.router.url.includes('gadgets') ? 'gadgets' : 'photos';

    this.displayedColumns =
      this.category === 'gadgets'
        ? ['name', 'quantity', 'size', 'color']
        : ['name', 'quantity'];

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
      .subscribe(() => {
        this.orders.deleteProduct(product).subscribe((res) => {
          const { err, success } = res;

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
      .subscribe(() => {
        this.orders.confirmOrder(this.category).subscribe((res) => {
          const { success } = res;

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
