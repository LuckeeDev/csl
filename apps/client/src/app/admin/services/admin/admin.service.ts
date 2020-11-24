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

  createCommissione(form: ICommissione): Observable<IHttpRes<any>> {
    const commissione = { ...form, page: { } };

    return this.http.post<IHttpRes<any>>('/api/admin/commissioni', {
      commissione,
    });
  }
}
