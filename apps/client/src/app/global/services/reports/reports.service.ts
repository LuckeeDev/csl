import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBugData, IHttpRes, IReport } from '@csl/shared';
import { Observable } from 'rxjs';

interface IContactInfo {
  firstName: string;
  lastName: string;
  classID: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  technical: IReport[];
  visual: IReport[];
  other: IReport[];

  constructor(private http: HttpClient) {}

  sendBugReport(
    bugData: IBugData,
    contactInfo: IContactInfo
  ): Observable<IHttpRes<any>> {
    if (contactInfo) {
      return this.http.post<IHttpRes<any>>('/api/reports/bug', { bugData, contactInfo });
    } else {
      return this.http.post<IHttpRes<any>>('/api/reports/bug', { bugData });
    }
  }

  getReports(): Observable<IHttpRes<IReport[]>> {
    return this.http.get<IHttpRes<IReport[]>>('/api/reports');
  }

  toggleSolved(id: IReport['id'], solved: IReport['solved']) {
    return this.http.patch<IHttpRes<any>>(`/api/reports/solved`, {
      id,
      solved,
    });
  }
}
