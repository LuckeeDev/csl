import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

const MDREGEXP = /\/assets\/md\/(.*).md/gm;

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (!MDREGEXP.test(req.url)) {
			const updatedRequest = req.clone({
				url: `${environment.api}${req.url}`,
				withCredentials: true,
			});

			return next.handle(updatedRequest);
		} else {
			return next.handle(req);
		}
	}
}
