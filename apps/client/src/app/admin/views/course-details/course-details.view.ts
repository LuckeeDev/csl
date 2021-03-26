import { AdminService } from '@/admin/services/admin/admin.service';
import { CogeService } from '@/global/services/coge/coge.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICourse, IUser } from '@csl/shared';
import { DialogService } from '@csl/ui';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';

@Component({
	selector: 'csl-course-details',
	templateUrl: './course-details.view.html',
	styleUrls: ['./course-details.view.scss'],
})
export class CourseDetailsView implements OnInit {
	id: ICourse['id'];
	course$: Observable<ICourse>;

	userQuery = new FormControl('');

	users$: Observable<IUser[]>;

	constructor(
		private route: ActivatedRoute,
		private coge: CogeService,
		private admin: AdminService,
		private dialog: DialogService
	) {}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');

		this.course$ = this.coge.availableCourses$.pipe(
			map((courses) => courses.find((x) => x.id === this.id))
		);

		this.users$ = this.userQuery.valueChanges.pipe(
			debounceTime(1000),
			filter((value) => value),
			switchMap((value) => this.admin.searchUsers(value)),
			map((res) => res.data)
		);
	}

	assignSpeaker(
		id: IUser['id'],
		name: IUser['name'],
		classID: IUser['classID']
	) {
		this.dialog
			.open({
				title: "Vuoi assegnare l'utente a questo corso?",
				text: `L'utente ${name} della classe ${classID} sarà assegnato a questo corso`,
				answer: 'Sì, assegna',
				color: 'primary',
			})
			.subscribe((res) => console.log(res, 'added'));
	}
}
