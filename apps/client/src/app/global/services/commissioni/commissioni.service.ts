import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommissione, IHttpRes } from '@csl/shared';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommissioniService {
  constructor(private http: HttpClient) {}

  getPage(id: string): Observable<IHttpRes<ICommissione>> {
    return this.http.get<IHttpRes<ICommissione>>(`/commissioni/${id}`);
  }

  savePage(id: ICommissione['id'], page: ICommissione['page']): Observable<IHttpRes<any>> {
    return this.http.patch<IHttpRes<any>>(`/commissioni/${id}`, { page });
  }

  addPDF(pdf: string, id: ICommissione['id']): Observable<IHttpRes<ICommissione['files']>> {
    return this.http.post<IHttpRes<ICommissione['files']>>(
      `/commissioni/${id}/pdf`,
      { pdf },
    );
  }

  removePDF(
    file: string,
    id: ICommissione['id']
  ): Observable<IHttpRes<ICommissione['files']>> {
    return this.http.delete<IHttpRes<ICommissione['files']>>(
      `/commissioni/${id}/pdf/${file}`
    );
  }
}
