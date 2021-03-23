import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export const preventAPI = 'no-api';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (!req.url.includes(preventAPI)) {
			const updatedRequest = req.clone({
				url: `${environment.api}${req.url}`,
				withCredentials: true,
			});

			return next.handle(updatedRequest);
		} else {
			const url = req.url.replace(preventAPI, '');

			const noApiRequest = req.clone({
				url,
			});

			return next.handle(noApiRequest);
		}
	}
}
