import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ProductInterface, OrdersInterface } from '@global/@types/orders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  gadgets: ProductInterface[];
  photos: ProductInterface[];

  gadgetsConfirmed: boolean;
  photosConfirmed: boolean;

  constructor(private http: HttpClient) {}

  // Get all user's orders
  getOrders() {
    this.http.get('/api/orders').subscribe((res: OrdersInterface) => {
      this.gadgets = res.gadgets;
      this.photos = res.photos;

      this.gadgetsConfirmed = res.gadgetsConfirmed;
      this.photosConfirmed = res.photosConfirmed;
    });
  }

  // Add a product to the user's cart
  addToCart(product, callback) {
    return this.http.post('/api/orders/add', { product }).subscribe(callback);
  }

  // Confirm an order
  confirmOrder(category, callback): void {
    this.http.post('/api/orders/confirm', { category }).subscribe(callback);
  }

  // Delete a product from the cart
  deleteProduct(product: ProductInterface, callback): void {
    this.http
      .post('/api/orders/delete', { product: product })
      .pipe(
        tap((res: any) => {
          if (res.success === true) {
            if (product.size && product.color) {
              this.gadgets = this.gadgets.filter(
                (value: ProductInterface) => value != product
              );
            } else {
              this.photos = this.photos.filter(
                (value: ProductInterface) => value != product
              );
            }
          }
        })
      )
      .subscribe(callback);
  }

  // Retrieve a payment intent from the backend
  createPaymentIntent(category: string): Observable<any> {
    return this.http
      .post('/api/orders/create-payment-intent', { category });
  }
}
