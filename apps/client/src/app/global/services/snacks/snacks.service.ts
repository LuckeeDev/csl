import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISnack } from '@csl/shared';
import { SocketService } from '@global/services/socket/socket.service';

@Injectable({
  providedIn: 'root',
})
export class SnacksService {
  constructor(private http: HttpClient, private socketService: SocketService) {}

  // Reserved to bar-admin
  createSnack(snack: ISnack): Observable<any> {
    return this.http.post('/snacks/manage', { snack });
  }

  deleteSnack(id: ISnack['id']): Observable<any> {
    return this.http.delete(`/snacks/manage/${id}`);
  }

  updateQuantity(id: ISnack['id'], maxQuantity: number): Observable<any> {
    return this.http.patch(`/snacks/manage/${id}`, { maxQuantity });
  }

  // Publicly available
  getSnacks(): Observable<any> {
    return this.http.get('/snacks');
  }

  addToCart(id: ISnack['id']): Observable<any> {
    return this.http.post('/snacks/cart', { id });
  }

  getCart(): Observable<any> {
    return this.http.get('/snacks/cart');
  }

  deleteFromCart(id: ISnack['id']): Observable<any> {
    return this.http.delete(`/snacks/cart/${id}`);
  }

  confirmOrder(): Observable<any> {
    return this.http.get('/snacks/cart/confirm');
  }

  // Socket methods
  socket$(): Observable<any> {
    return this.socketService.listen('Orders');
  }
}
