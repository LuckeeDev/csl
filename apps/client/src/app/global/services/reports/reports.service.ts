import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBugData, IHttpRes } from '@csl/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  sendBugReport(bugData: IBugData): Observable<IHttpRes<any>> {
    return this.http.post<IHttpRes<any>>('/api/reports/bug', { bugData });
  }
}
