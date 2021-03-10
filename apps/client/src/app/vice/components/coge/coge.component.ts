import { Component, OnInit } from '@angular/core';
import { CogeService } from '@global/services/coge/coge.service';
import { Observable } from 'rxjs';
import { CSLDataTableAction, CSLDataTableDisplayedColumns, CSLDataTableEvent, CSLDataTableSource, ICourse } from '@csl/shared';
import { filter, map } from 'rxjs/operators';

type Actions = 'DELETE';

@Component({
	selector: 'csl-coge',
	templateUrl: './coge.component.html',
	styleUrls: ['./coge.component.scss'],
})
export class CogeComponent implements OnInit {
	dataSource$: Observable<CSLDataTableSource>;

	actions: CSLDataTableAction<Actions>[] = [
		{
			id: 'DELETE',
			label: 'Elimina Evento',
			type: 'warn',
		},
	];

	displayedColumns: CSLDataTableDisplayedColumns<keyof ICourse> = [
		{ type: 'data', id: 'title', label: 'Titolo' },
		{ type: 'data', id: 'description', label: 'Descrizione' },
		{ type: 'data', id: 'speakers', label: 'Descrizione' },
		{ type: 'data', id: 'id', label: 'Descrizione' },
		{ type: 'actions', id: 'manage', label: 'Gestisci' },
	];

	constructor(private coge: CogeService) {}

	ngOnInit(): void {
		this.dataSource$ = this.coge.getAllCourses().pipe(
			filter((res) => res.success === true),
			map(({ data }) => {
				const dataSource: CSLDataTableSource = data.map((course) => ({
					id: course.id,
					data: course,
					actions: this.actions,
				}));

				return dataSource;
			})
		);
	}

	log(e: CSLDataTableEvent<Actions>) {
		console.log(e);
	}
}
