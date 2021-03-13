import { CogeService } from '@/global/services/coge/coge.service';
import { Component, OnInit } from '@angular/core';
import {
	CSLDataTableAction,
	CSLDataTableDisplayedColumns,
	CSLDataTableEvent,
	CSLDataTableSource,
	ICourse,
} from '@csl/shared';
import { InfoDialogService } from '@csl/ui';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

type Courses = Record<ICourse['slot'], CSLDataTableSource<ICourse>>;

type Action = 'DETAILS';

@Component({
	selector: 'csl-coge',
	templateUrl: './coge.view.html',
	styleUrls: ['./coge.view.scss'],
})
export class CogeView implements OnInit {
	currentIndex: number;

	courses$: Observable<ICourse[]>;
	dataSource$: Observable<Courses>;
	slots$: Observable<ICourse['slot'][]>;

	actions: CSLDataTableAction<Action>[] = [
		{ type: 'primary', id: 'DETAILS', label: 'Dettagli del corso' },
	];

	displayedColumns: CSLDataTableDisplayedColumns<keyof ICourse> = [
		{ type: 'data', id: 'title', label: 'Titolo' },
		{ type: 'actions', id: 'manage', label: 'Dettagli' },
	];

	constructor(private coge: CogeService, private info: InfoDialogService) {}

	ngOnInit(): void {
		this.courses$ = this.coge.getAllCourses().pipe(
			filter(({ success }) => success),
			map(({ data }) => data)
		);

		this.dataSource$ = this.courses$.pipe(
			map((courses) => ({
				a: this._convertToDataSource(this._onlySlot('a', courses)),
				b: this._convertToDataSource(this._onlySlot('b', courses)),
				c: this._convertToDataSource(this._onlySlot('c', courses)),
				d: this._convertToDataSource(this._onlySlot('d', courses)),
				e: this._convertToDataSource(this._onlySlot('e', courses)),
				f: this._convertToDataSource(this._onlySlot('f', courses)),
			}))
		);

		this.slots$ = this.dataSource$.pipe(
			map((courses) => Object.keys(courses) as ICourse['slot'][])
		);
	}

	handleEvent(e: CSLDataTableEvent<Action>) {
		const course = this.courses$.pipe(
			map((courses) => courses.find((course) => course.id === e.id))
		);

		if (e.action === 'DETAILS') {
			course.subscribe((currentCourse) => {
				this.info.open({
					title: currentCourse.title,
					content: [
						{
							header: 'Categoria',
							paragraph: currentCourse.category,
						},
						{ header: 'Descrizione', paragraph: currentCourse.description },
						{
							header: 'Relatori',
							paragraph: currentCourse.speakers
								.map(({ name, classID }) => `${name} - ${classID}`)
								.join('<br />'),
						},
						{ header: 'Note', paragraph: currentCourse.notes },
					],
				});
			});
		}
	}

	private _onlySlot(onlySlot: ICourse['slot'], data: ICourse[]) {
		return data.filter(({ slot }) => slot === onlySlot);
	}

	private _convertToDataSource(data: ICourse[]): CSLDataTableSource<ICourse> {
		return data.map((course) => ({
			id: course.id,
			data: course,
			actions: this.actions,
		}));
	}
}
