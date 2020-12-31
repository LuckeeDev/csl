import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHttpRes, IProduct } from '@csl/shared';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getGadgets(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/products/gadgets');
  }

  getPhotos(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/products/photos');
  }

  getProduct(id: string) {
    return this.http.post('/products/find', { id });
  }

  deleteProduct(id: string): Observable<IHttpRes<any>> {
    return this.http.delete<IHttpRes<any>>(`/products/${id}`);
  }
}
