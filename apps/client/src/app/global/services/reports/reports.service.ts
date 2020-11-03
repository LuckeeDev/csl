import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBugData, IHttpRes, IReport } from '@csl/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  technical: IReport[];
  visual: IReport[];
  other: IReport[];

  constructor(private http: HttpClient) { }

  sendBugReport(bugData: IBugData): Observable<IHttpRes<any>> {
    return this.http.post<IHttpRes<any>>('/api/reports/bug', { bugData });
  }

  getReports(): Observable<IHttpRes<IReport[]>> {
    return this.http.get<IHttpRes<IReport[]>>('/api/reports');
  }
}
