import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse, IHttpRes } from '@csl/shared';
import { Observable } from 'rxjs';

type SignupDraft = Record<
	ICourse['slot'],
	[ICourse['id']?, ICourse['id']?, ICourse['id']?]
>;

const defaultDraft: SignupDraft = {
	a: [],
	b: [],
	c: [],
	d: [],
	e: [],
	f: [],
};

@Injectable({
	providedIn: 'root',
})
export class CogeService {
	draft: SignupDraft = defaultDraft;

	constructor(private http: HttpClient) {}

	createCourse(course: ICourse): Observable<IHttpRes<any>> {
		return this.http.post<IHttpRes<any>>('/coge/courses', { course });
	}

	getCourses(): Observable<IHttpRes<ICourse[]>> {
		return this.http.get<IHttpRes<ICourse[]>>('/coge/courses');
	}

	getAllCourses(): Observable<IHttpRes<ICourse[]>> {
		return this.http.get<IHttpRes<ICourse[]>>('/coge');
	}

	subscribeToCourse(id: string, slot: string): Observable<IHttpRes<void>> {
		return this.http.post<IHttpRes<void>>('/coge/signup', { course: id, slot });
	}

	pushToDraft(id: string, slot: ICourse['slot']) {
		if (!this.draft[slot].includes(id)) {
			this.draft[slot].push(id);
		}
	}
}
