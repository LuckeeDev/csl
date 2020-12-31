import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse, IHttpRes } from '@csl/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CogeService {

  constructor(private http: HttpClient) { }

  createCourse(course: ICourse): Observable<IHttpRes<any>> {
    return this.http.post<IHttpRes<any>>('/coge/courses', { course });
  }

  getCourses(): Observable<IHttpRes<ICourse[]>> {
    return this.http.get<IHttpRes<ICourse[]>>('/coge/courses');
  }
}
