import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommissione, ICourse, IHttpRes, ILog, IUser } from '@csl/shared';
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

	generateCogeLink(id: ICourse['id']): Observable<IHttpRes<string>> {
		return this.http.get<IHttpRes<string>>(`/service/links/${id}`);
	}

	searchUsers(name: string): Observable<IHttpRes<IUser[]>> {
		return this.http.get<IHttpRes<IUser[]>>(`/users/search?name=${name}`, {
			headers: {
				ignoreLoadingBar: '',
			},
		});
	}
}
