import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccount, ICommissione, IHttpRes, ILog } from '@csl/shared';
import { Observable } from 'rxjs';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}

  createAccount(account: IAccount): Observable<IHttpRes<any>> {
    return this.http.post<IHttpRes<any>>('/api/admin/accounts', { account });
  }

  removeAccount(email: string): Observable<IHttpRes<any>> {
    return this.http.delete<IHttpRes<any>>(`/api/admin/accounts/${email}`);
  }

  getErrors(): Observable<IHttpRes<ILog[]>> {
    return this.http.get<IHttpRes<ILog[]>>('/api/admin/errors');
  }

  getEvents(): Observable<IHttpRes<ILog[]>> {
    return this.http.get<IHttpRes<ILog[]>>('/api/admin/events');
  }

  getCommissioni(): Observable<IHttpRes<ICommissione[]>> {
    return this.http.get<IHttpRes<ICommissione[]>>('/api/admin/commissioni');
  }

  createCommissione(commissione: ICommissione): Observable<IHttpRes<ICommissione[]>> {
    return this.http.post<IHttpRes<ICommissione[]>>('/api/admin/commissioni', {
      commissione,
    });
  }

  removeCommissione(
    id: ICommissione['id']
  ): Observable<IHttpRes<ICommissione[]>> {
    return this.http.delete<IHttpRes<ICommissione[]>>(
      `/api/admin/commissioni/${id}`
    );
  }
}
