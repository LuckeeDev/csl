import { Component, OnInit } from '@angular/core';
import { CogeService } from '@global/services/coge/coge.service';
import {
	CSLDataTableAction,
	CSLDataTableDisplayedColumns,
	CSLDataTableEvent,
	CSLDataTableSource,
	ICourse,
} from '@csl/shared';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { InfoDialogService } from '@csl/ui';

type TableAction = 'DETAILS';

@Component({
	selector: 'csl-coge',
	templateUrl: './coge.component.html',
	styleUrls: ['./coge.component.scss'],
})
export class CogeComponent implements OnInit {
	dataSource$: Observable<CSLDataTableSource<ICourse>>;

	courses$: Observable<ICourse[]>;

	actions: CSLDataTableAction<TableAction>[] = [
		{
			id: 'DETAILS',
			label: 'Dettagli',
			type: 'primary',
		},
	];

	displayedColumns: CSLDataTableDisplayedColumns<keyof ICourse> = [
		{ type: 'data', id: 'title', label: 'Titolo' },
		{ type: 'data', id: 'description', label: 'Descrizione' },
		{ type: 'data', id: 'category', label: 'Categoria' },
		{ type: 'data', id: 'slot', label: 'Fascia' },
		{ type: 'data', id: 'notes', label: 'Note' },
		{ type: 'actions', id: 'manage', label: 'Gestisci' },
	];

	constructor(private coge: CogeService, private info: InfoDialogService) {}

	ngOnInit(): void {
		this.dataSource$ = this.coge.availableCourses$.pipe(
			map((courses) =>
				courses
					? courses.map((course) => ({
							id: course.id,
							data: course,
							actions: this.actions,
					  }))
					: []
			)
		);
	}

	eventHandler(e: CSLDataTableEvent<TableAction>) {
		const course$ = this.coge.availableCourses$.pipe(
			map((courses) => courses.find((course) => course.id === e.id))
		);

		if (e.action === 'DETAILS') {
			course$
				.pipe(
					switchMap((currentCourse) => {
						return this.info.open({
							confirm: 'Conferma',
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
								{
									header: 'Iscritti',
									paragraph: `${currentCourse.signups.length} / ${
										currentCourse.max - currentCourse.speakers.length
									}`,
								},
								{ header: 'Note', paragraph: currentCourse.notes },
							],
						});
					})
				)
				.subscribe();
		}
	}
}
