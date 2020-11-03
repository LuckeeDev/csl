import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { stripeKey } from '@environments/environment';
import { IHttpRes, IPaymentIntentData } from '@csl/shared';

import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';

import { OrdersService } from '@global/services/orders/orders.service';
import { DialogService, ToastrService } from '@csl/ui';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  classID: string;
  category: string;

  total: number;
  isConfirmed: boolean;
  isPaid: boolean;
  clientSecret: string;

  stripe: Stripe;
  card: StripeCardElement;

  loading: boolean;
  btnDisabled: boolean;

  constructor(
    private orders: OrdersService,
    private activated: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: DialogService
  ) {
    this.isConfirmed = true;
    this.isPaid = false;
    this.loading = false;
    this.category = this.activated.snapshot.paramMap.get('category');
  }

  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe(stripeKey);

    this.orders.createPaymentIntent(this.category).subscribe((res: IHttpRes<IPaymentIntentData>) => {
      if (res.success === false && res.err === 'no-orders') {
        this.toastr.show({
          message: 'Ordini non trovati!',
          action: 'Chiudi',
          duration: 5000,
        });
      }

      if (res.success === true) {
        this.setupPaymentForm(res, this.stripe);
      } else if (res.data.isConfirmed === false) {
        this.isConfirmed = false;
      } else {
        this.isPaid = true;
      }
    });
  }

  setupPaymentForm(res: IHttpRes<IPaymentIntentData>, stripe: Stripe): void {
    const { total, clientSecret, classID } = res.data;
    this.total = total;
    this.classID = classID;
    this.clientSecret = clientSecret;

    const elements = stripe.elements();

    const style = {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };

    this.card = elements.create('card', {
      style: style,
    });

    this.card.mount('#card-element');

    this.card.on('change', (event) => {
      this.btnDisabled = event.empty;

      document.querySelector('#card-errors').textContent = event.error
        ? event.error.message
        : '';
    });
  }

  payWithCard() {
    this.dialog
      .open({
        title: 'Confermi?',
        text: 'Stai per completare il pagamento per la tua classe',
        answer: 'Sì, conferma pagamento',
        color: 'primary',
      })
      .subscribe((res) => {
        this.loading = true;

        this.stripe
          .confirmCardPayment(this.clientSecret, {
            payment_method: {
              card: this.card,
            },
          })
          .then((result) => {
            if (result.error) {
              this.showError(result.error.message);
            } else {
              this.paymentCompleted();
            }
          });
      });
  }

  paymentCompleted() {
    this.loading = false;
    this.btnDisabled = true;

    this.toastr.show({
      message: 'Pagamento completato con successo, puoi tornare alla home',
    });
  };

  showError(msg: string) {
    this.loading = false;

    this.toastr.show({ message: msg, duration: 10000 });
  };
}
