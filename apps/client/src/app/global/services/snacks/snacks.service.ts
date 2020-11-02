import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISnack } from '@global/@types/snacks';
import { SocketService } from '@global/services/socket/socket.service';

@Injectable({
  providedIn: 'root',
})
export class SnacksService {
  constructor(private http: HttpClient, private socketService: SocketService) {}

  // Reserved to bar-admin
  createSnack(snack: ISnack): Observable<any> {
    return this.http.post('/api/snacks/manage', { snack });
  }

  deleteSnack(id: ISnack['id']): Observable<any> {
    return this.http.delete(`/api/snacks/manage/${id}`);
  }

  updateQuantity(id: ISnack['id'], maxQuantity: number): Observable<any> {
    return this.http.patch(`/api/snacks/manage/${id}`, { maxQuantity });
  }

  // Publicly available
  getSnacks(): Observable<any> {
    return this.http.get('/api/snacks');
  }

  addToCart(id: ISnack['id']): Observable<any> {
    return this.http.post('/api/snacks/cart', { id });
  }

  getCart(): Observable<any> {
    return this.http.get('/api/snacks/cart');
  }

  deleteFromCart(id: ISnack['id']): Observable<any> {
    return this.http.delete(`/api/snacks/cart/${id}`);
  }

  confirmOrder(): Observable<any> {
    return this.http.get('/api/snacks/cart/confirm');
  }

  // Socket methods
  socket$(): Observable<any> {
    return this.socketService.listen('Orders');
  }
}
