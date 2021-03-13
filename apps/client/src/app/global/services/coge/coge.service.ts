import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse, IHttpRes } from '@csl/shared';
import { Observable } from 'rxjs';

interface CourseInSlot {
	id: ICourse['id'];
	label: ICourse['title'];
}

interface SignupDirty {
	dirty: boolean;
}

type SignupSlots = Record<
	ICourse['slot'],
	[CourseInSlot?, CourseInSlot?, CourseInSlot?]
>;

interface SignupDraft extends SignupDirty, SignupSlots {}

const defaultDraft: SignupDraft = {
	a: [],
	b: [],
	c: [],
	d: [],
	e: [],
	f: [],
	dirty: false,
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

	subscribeToCourses(slot: ICourse['slot']): Observable<IHttpRes<void>> {
		const courses = this.draft[slot].map(({ id }) => id);
		
		return this.http.post<IHttpRes<void>>('/coge/signup', {
			courses,
			slot,
		});
	}

	pushToDraft(course: CourseInSlot, slot: ICourse['slot']) {
		if (!this.draft[slot].find(({ id }) => id === course.id)) {
			this.draft[slot].push(course);
			this.draft.dirty = true;
		}
	}
}
