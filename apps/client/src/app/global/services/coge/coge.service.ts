import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse, IHttpRes, IUser } from '@csl/shared';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

interface CourseInSlot {
	id: ICourse['id'];
	label: ICourse['title'];
}

interface SignupStatus {
	dirty: boolean;
}

type Courses = [CourseInSlot?, CourseInSlot?, CourseInSlot?];

type SignupSlots = Record<
	ICourse['slot'],
	{ courses: Courses; confirmed: boolean }
>;

interface SignupDraft extends SignupStatus, SignupSlots {}

const defaultDraft: SignupDraft = {
	a: { courses: [], confirmed: false },
	b: { courses: [], confirmed: false },
	c: { courses: [], confirmed: false },
	d: { courses: [], confirmed: false },
	e: { courses: [], confirmed: false },
	f: { courses: [], confirmed: false },
	dirty: false,
};

@Injectable({
	providedIn: 'root',
})
export class CogeService {
	draft: SignupDraft = defaultDraft;

	availableCourses$: Observable<ICourse[]>;
	private availableCoursesSubject$: BehaviorSubject<ICourse[]> = new BehaviorSubject(null);

	constructor(private http: HttpClient, private auth: AuthService) {
		this.availableCourses$ = this.availableCoursesSubject$.asObservable();

		const courses$ = this.auth.user$.pipe(
			map((user) => user.courses),
			map((courses) => {
				return Object.entries(courses) as [
					ICourse['slot'],
					[ICourse['id'], ICourse['id'], ICourse['id']]
				][];
			})
		);

		forkJoin({
			entries: courses$,
			availableCourses: this.getAllCourses().pipe(map(({ data }) => data)),
		}).subscribe({
			next: ({ entries, availableCourses }) => {
				this.availableCoursesSubject$.next(availableCourses);

				for (const [slot, ids] of entries) {
					const courses: Courses = ids.map((id) => ({
						id,
						label: availableCourses.find((course) => course.id === id).title,
					})) as Courses;

					this.draft[slot].courses = courses;
					this.draft[slot].confirmed = true;
				}
			},
		});
	}

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
		const courses = this.draft[slot].courses.map(({ id }) => id);

		return this.http
			.post<IHttpRes<void>>('/coge/signup', {
				courses,
				slot,
			})
			.pipe(
				tap(({ success }) => {
					if (success === true) this.draft[slot].confirmed = true;
				})
			);
	}

	getUserSubscriptions(): Observable<IHttpRes<IUser['courses']>> {
		return this.http.get<IHttpRes<IUser['courses']>>('/coge/signup');
	}

	pushToDraft(course: CourseInSlot, slot: ICourse['slot']) {
		if (!this.draft[slot].courses.find(({ id }) => id === course.id)) {
			this.draft[slot].courses.push(course);
			this.draft.dirty = true;
		}
	}
}
