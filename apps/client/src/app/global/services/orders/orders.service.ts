import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IProductInCart,
	IUserOrders,
	IHttpRes,
	PaymentSessionData,
	IProduct,
	ProductInUserCart,
	IUser,
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

	addToCart(product: ProductInUserCart): Observable<IHttpRes<IUser['cart']>> {
		return this.http.patch<IHttpRes<IUser['cart']>>('/users/me/cart', product);
	}

	confirmOrder(
		category: IProduct['category'],
		phone: IUser['phone']
	): Observable<IHttpRes<void>> {
		return this.http.patch<IHttpRes<void>>('/users/me/confirm', {
			category,
			phone,
		});
	}

	removeFromCart(
		cartID: ProductInUserCart['cartID']
	): Observable<IHttpRes<void>> {
		return this.http.delete<IHttpRes<void>>(`/users/me/cart/${cartID}`);
	}

	setupPayment(
		category: IProduct['category']
	): Observable<IHttpRes<PaymentSessionData>> {
		return this.http.post<IHttpRes<PaymentSessionData>>(
			'/orders/setup-payment',
			{ category }
		);
	}

	getClassroom(): Observable<IHttpRes<IUser[]>> {
		return this.http.get<IHttpRes<IUser[]>>('/users/class');
	}
}
