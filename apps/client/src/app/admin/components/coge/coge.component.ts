import { Component, OnInit } from '@angular/core';
import { CogeService } from '@global/services/coge/coge.service';
import {
	CSLDataTableAction,
	CSLDataTableDisplayedColumns,
	CSLDataTableSource,
	ICourse,
} from '@csl/shared';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
	selector: 'csl-coge',
	templateUrl: './coge.component.html',
	styleUrls: ['./coge.component.scss'],
})
export class CogeComponent implements OnInit {
	dataSource$: Observable<CSLDataTableSource<ICourse>>;

	courses$: Observable<ICourse[]>;

	actions: CSLDataTableAction[] = [
		{
			id: 'DELETE',
			label: 'Elimina Evento',
			type: 'warn',
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

	constructor(private coge: CogeService) {}

	ngOnInit(): void {
		this.dataSource$ = this.coge.getCourses().pipe(
			filter(({ success }) => success),
			map(({ data }) =>
				data.map((course) => ({
					id: course.id,
					data: course,
					actions: this.actions,
				}))
			)
		);
	}

	eventHandler(e) {
		console.log(e);
	}
}
