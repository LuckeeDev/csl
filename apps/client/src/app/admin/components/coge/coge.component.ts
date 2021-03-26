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
import { DialogService, ToastrService } from '@csl/ui';
import { AdminService } from '@/admin/services/admin/admin.service';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { ActivatedRoute, Router } from '@angular/router';

type TableAction = 'DETAILS' | 'GENERATE_LINK';

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
			type: 'basic',
		},
		{
			id: 'GENERATE_LINK',
			label: 'Genera Link',
			type: 'primary',
		},
	];

	displayedColumns: CSLDataTableDisplayedColumns<keyof ICourse> = [
		{ type: 'data', id: 'title', label: 'Titolo' },
		{ type: 'data', id: 'category', label: 'Categoria' },
		{ type: 'data', id: 'slot', label: 'Fascia' },
		{ type: 'data', id: 'notes', label: 'Note' },
		{ type: 'actions', id: 'manage', label: 'Gestisci' },
	];

	constructor(
		private coge: CogeService,
		private admin: AdminService,
		private toastr: ToastrService,
		private dialog: DialogService,
		private router: Router,
		private route: ActivatedRoute
	) {}

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
			course$.subscribe(({ id }) =>
				this.router.navigate([id], { relativeTo: this.route })
			);
		} else if (e.action === 'GENERATE_LINK') {
			this.dialog
				.open({
					title: 'Generare link?',
					text: 'Non sarà più possibile modificarlo!',
					answer: 'Sì, conferma',
					color: 'primary',
				})
				.pipe(switchMap(() => this.admin.generateCogeLink(e.id)))
				.subscribe({
					next: (res) => {
						if (res.success) {
							console.log(res.data);
							this.toastr
								.show({
									color: 'success',
									message: 'Link generato',
									action: 'Copia link',
									duration: 15000,
								})
								.onAction()
								.subscribe(() => copyToClipboard(res.data));
						} else if (res.err === 'link-exists') {
							this.toastr.showError('Hai già creato un link per questo corso!');
						} else {
							this.toastr.showError();
						}
					},
				});
		}
	}
}
