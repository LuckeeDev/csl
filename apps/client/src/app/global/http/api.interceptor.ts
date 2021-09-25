import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Store } from '@ngxs/store';

export const preventAPI = 'no-api';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	constructor(private store: Store) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (!req.url.includes(preventAPI) && !req.url.includes('localhost:1337')) {
			const updatedRequest = req.clone({
				url: `${environment.api}${req.url}`,
				withCredentials: true,
			});

			return next.handle(updatedRequest);
		} else if (req.url.includes('localhost:1337')) {
			const { jwt } = this.store.snapshot().auth;

			if (jwt) {
				const authorizedRequest = req.clone({
					setHeaders: {
						Authorization: `Bearer ${jwt}`,
					},
				});

				return next.handle(authorizedRequest);
			}

			return next.handle(req);
		} else {
			const url = req.url.replace(preventAPI, '');

			const noApiRequest = req.clone({
				url,
			});

			return next.handle(noApiRequest);
		}
	}
}
