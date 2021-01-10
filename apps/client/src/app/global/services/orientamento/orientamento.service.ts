import { Injectable } from '@angular/core';
import { IEvent, IHttpRes } from '@csl/shared';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrientamentoService {

  constructor(private http: HttpClient) { }

  getEvent(id: IEvent['id']): Observable<IHttpRes<IEvent>> {
    return this.http.get<IHttpRes<IEvent>>(`/orientamento/${id}`);
  }

  getEvents(): Observable<IHttpRes<IEvent[]>> {
    return this.http.get<IHttpRes<IEvent[]>>('/orientamento');
  }

  createEvent(event: IEvent): Observable<IHttpRes<IEvent>> {
    return this.http.post<IHttpRes<IEvent>>('/orientamento', { event });
  }

  deleteEvent(id: IEvent['id']) {
    return this.http.delete<IHttpRes<any>>(`/orientamento/${id}`);
  }
}
