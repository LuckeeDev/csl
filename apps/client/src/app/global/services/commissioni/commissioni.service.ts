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

  uploadPDF(file: File, id: ICommissione['id']): Observable<IHttpRes<ICommissione['files']>> {
    const formData = new FormData();
    formData.append('pdf', file);

    return this.http.post<IHttpRes<ICommissione['files']>>(
      `/api/commissioni/${id}/pdf`,
      formData
    );
  }

  deletePDF(
    file: string,
    id: ICommissione['id']
  ): Observable<IHttpRes<ICommissione['files']>> {
    return this.http.delete<IHttpRes<ICommissione['files']>>(
      `/api/commissioni/${id}/pdf/${file}`
    );
  }
}
