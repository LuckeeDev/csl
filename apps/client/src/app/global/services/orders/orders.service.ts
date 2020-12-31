import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {
  IProductInCart,
  IUserOrders,
  IHttpRes,
  IPaymentIntentData,
} from '@csl/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  gadgets: IProductInCart[];
  photos: IProductInCart[];

  gadgetsConfirmed: boolean;
  photosConfirmed: boolean;

  constructor(private http: HttpClient) {}

  getOrders() {
    this.http.get('/orders').subscribe((res: IUserOrders) => {
      this.gadgets = res.gadgets;
      this.photos = res.photos;

      this.gadgetsConfirmed = res.gadgetsConfirmed;
      this.photosConfirmed = res.photosConfirmed;
    });
  }

  addToCart(product: IProductInCart): Observable<IHttpRes<any>> {
    return this.http.post<IHttpRes<any>>('/orders/add', { product });
  }

  confirmOrder(category): Observable<any> {
    return this.http.post('/orders/confirm', { category });
  }

  deleteProduct(product: IProductInCart): Observable<any> {
    return this.http.post('/orders/delete', { product: product }).pipe(
      tap((res: any) => {
        if (res.success === true) {
          if (product.size && product.color) {
            this.gadgets = this.gadgets.filter(
              (value: IProductInCart) => value !== product
            );
          } else {
            this.photos = this.photos.filter(
              (value: IProductInCart) => value !== product
            );
          }
        }
      })
    );
  }

  createPaymentIntent(
    category: string
  ): Observable<IHttpRes<IPaymentIntentData>> {
    return this.http.post<IHttpRes<IPaymentIntentData>>(
      '/orders/create-payment-intent',
      { category }
    );
  }
}
