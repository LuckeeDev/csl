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
    return this.http.get<IProduct[]>('/api/products/gadgets');
  }

  getPhotos(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/api/products/photos');
  }

  getProduct(id: string) {
    return this.http.post('/api/products/find', { id });
  }

  deleteProduct(id: string): Observable<IHttpRes<any>> {
    return this.http.delete<IHttpRes<any>>(`/api/products/${id}`);
  }
}
