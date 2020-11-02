import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '@global/@types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getGadgets(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/api/products/gadgets');
  }

  getPhotos(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/api/products/photos');
  }

  getProduct(id, callback) {
    return this.http.post('/api/products/find', { id }).subscribe(callback);
  }

  deleteProduct(id: string, callback) {
    return this.http.delete(`/api/products/${id}`).subscribe(callback);
  }
}
