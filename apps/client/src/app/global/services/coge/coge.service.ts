import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse, IHttpRes } from '@csl/shared';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

interface CourseInSlot {
	id: ICourse['id'];
	label: ICourse['title'];
}

interface SignupStatus {
	dirty: boolean;
}

type SignupSlots = Record<
	ICourse['slot'],
	{ course: CourseInSlot; confirmed: boolean }
>;

interface SignupDraft extends SignupStatus, SignupSlots {}

const defaultDraft: SignupDraft = {
	a: { course: undefined, confirmed: false },
	b: { course: undefined, confirmed: false },
	c: { course: undefined, confirmed: false },
	d: { course: undefined, confirmed: false },
	e: { course: undefined, confirmed: false },
	f: { course: undefined, confirmed: false },
	dirty: false,
};

@Injectable({
	providedIn: 'root',
})
export class CogeService {
	draft: SignupDraft = defaultDraft;

	availableCourses$: Observable<ICourse[]>;
	private availableCoursesSubject$: BehaviorSubject<
		ICourse[]
	> = new BehaviorSubject([]);

	constructor(private http: HttpClient, private auth: AuthService) {
		this.availableCourses$ = this.availableCoursesSubject$.asObservable();

		const courses$ = this.auth.user$.pipe(
			map((user) => (user.courses ? user.courses : [])),
			map((courses) => {
				return Object.entries(courses) as [ICourse['slot'], ICourse['id']][];
			})
		);

		combineLatest([
			courses$,
			this.getAllCourses().pipe(map(({ data }) => data)),
		]).subscribe({
			next: ([entries, availableCourses]) => {
				this.availableCoursesSubject$.next(availableCourses);

				for (const [slot, id] of entries) {
					const course = {
						id,
						label: availableCourses.find((course) => course.id === id).title,
					};

					this.draft[slot].course = course;
					this.draft[slot].confirmed = true;
				}
			},
		});
	}

	createCourse(course: ICourse): Observable<IHttpRes<any>> {
		return this.http.post<IHttpRes<any>>('/coge/courses', { course });
	}

	getCourse(id: ICourse['id']): Observable<IHttpRes<ICourse>> {
		return this.http.get<IHttpRes<ICourse>>(`/coge/courses/${id}`);
	}

	getCourses(): Observable<IHttpRes<ICourse[]>> {
		return this.http.get<IHttpRes<ICourse[]>>('/coge/courses');
	}

	getAllCourses(): Observable<IHttpRes<ICourse[]>> {
		return this.http.get<IHttpRes<ICourse[]>>('/coge');
	}

	subscribeToCourses(slot: ICourse['slot']): Observable<IHttpRes<void>> {
		const course = this.draft[slot].course.id;

		return this.http
			.post<IHttpRes<void>>('/coge/signup', {
				course,
				slot,
			})
			.pipe(
				tap(({ success }) => {
					if (success === true) this.draft[slot].confirmed = true;
				})
			);
	}

	pushToDraft(course: CourseInSlot, slot: ICourse['slot']) {
		if (this.draft[slot].confirmed === false) {
			this.draft[slot].course = course;
			this.draft.dirty = true;
		}
	}
}
