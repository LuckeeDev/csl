import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommissione, IHttpRes } from '@csl/shared';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommissioniService {
  constructor(private http: HttpClient) {}

  getPage(id?: string): Observable<IHttpRes<ICommissione>> {
    return this.http.get<IHttpRes<ICommissione>>(`/api/commissioni/${id}`);
  }

  savePage(id: ICommissione['id'], page: ICommissione['page']): Observable<IHttpRes<any>> {
    return this.http.patch<IHttpRes<any>>(`/api/commissioni/${id}`, { page });
  }
}
