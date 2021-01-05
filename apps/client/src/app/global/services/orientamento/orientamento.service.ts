import { Injectable } from '@angular/core';
import { IEvent, IHttpRes } from '@csl/shared';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrientamentoService {

  constructor(private http: HttpClient) { }

  getEvent(id?: IEvent['id']): Observable<IHttpRes<IEvent | IEvent[]>> {
    return this.http
      .get<IHttpRes<IEvent | IEvent[]>>(
        id
        ? '/orientamento'
        : `/orientamento/${id}`
      );
  }

  createEvent(event: IEvent): Observable<IHttpRes<IEvent>> {
    return this.http.post<IHttpRes<IEvent>>('/orientamento', { event });
  }
}
