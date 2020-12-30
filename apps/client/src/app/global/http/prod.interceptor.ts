import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable()
export class ProdInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const prodRequest = !environment.production ? req.clone({
      url: `https://api.cslussana.com${req.url}`
    }) : null;

    console.log(prodRequest?.url, prodRequest?.method);
    return next.handle(req);
  }
}
