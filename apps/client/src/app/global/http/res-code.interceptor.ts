import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from '@csl/ui';
import { Injectable } from '@angular/core';

@Injectable()
export class ResCodeInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap((r) => {
          const res: any = r;
          if (res.status === 413) {
            this.toastr.showError('Il file caricato è troppo grande!');
          }

          if (res.status === 403) {
            this.toastr.showError('Non sei autorizzato a svolgere questa azione!');
          }
        })
      );
  }
}
