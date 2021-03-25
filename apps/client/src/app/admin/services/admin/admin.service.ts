import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommissione, IHttpRes, ILog } from '@csl/shared';
import { Observable } from 'rxjs';

@Injectable()
export class AdminService {
	constructor(private http: HttpClient) {}

	getErrors(): Observable<IHttpRes<ILog[]>> {
		return this.http.get<IHttpRes<ILog[]>>('/admin/errors');
	}

	getEvents(): Observable<IHttpRes<ILog[]>> {
		return this.http.get<IHttpRes<ILog[]>>('/admin/events');
	}

	emptyLogs(type: 'events' | 'errors'): Observable<IHttpRes<any>> {
		return this.http.delete<IHttpRes<any>>(`/admin/${type}`);
	}

	getCommissioni(): Observable<IHttpRes<ICommissione[]>> {
		return this.http.get<IHttpRes<ICommissione[]>>('/admin/commissioni');
	}

	createCommissione(
		commissione: ICommissione
	): Observable<IHttpRes<ICommissione[]>> {
		return this.http.post<IHttpRes<ICommissione[]>>('/admin/commissioni', {
			commissione,
		});
	}

	removeCommissione(
		id: ICommissione['id']
	): Observable<IHttpRes<ICommissione[]>> {
		return this.http.delete<IHttpRes<ICommissione[]>>(
			`/admin/commissioni/${id}`
		);
	}

	generateCogeLinks(): Observable<IHttpRes<string[]>> {
		return this.http.get<IHttpRes<string[]>>('/service/links');
	}
}
