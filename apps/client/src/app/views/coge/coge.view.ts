import { CogeService } from '@/global/services/coge/coge.service';
import { numberToLetter } from '@/utils/numberToLetter';
import { Component, HostListener, OnInit } from '@angular/core';
import {
	CSLDataTableAction,
	CSLDataTableDisplayedColumns,
	CSLDataTableEvent,
	CSLDataTableSource,
	ICourse,
} from '@csl/shared';
import { DialogService, InfoDialogService, ToastrService } from '@csl/ui';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

type Courses = Record<ICourse['slot'], CSLDataTableSource<ICourse>>;

type Action = 'DETAILS';

@Component({
	selector: 'csl-coge',
	templateUrl: './coge.view.html',
	styleUrls: ['./coge.view.scss'],
})
export class CogeView implements OnInit {
	currentIndex: number;

	dataSource$: Observable<Courses>;
	slots$: Observable<ICourse['slot'][]>;

	actions: CSLDataTableAction<Action>[] = [
		{ type: 'primary', id: 'DETAILS', label: 'Dettagli del corso' },
	];

	displayedColumns: CSLDataTableDisplayedColumns<keyof ICourse> = [
		{ type: 'data', id: 'title', label: 'Titolo' },
		{ type: 'actions', id: 'manage', label: 'Dettagli' },
	];

	@HostListener('window:beforeunload', ['$event'])
	handleClose(e: BeforeUnloadEvent) {
		if (this.coge.draft.dirty) {
			e.returnValue = false;
		}
	}

	constructor(
		private coge: CogeService,
		private info: InfoDialogService,
		private dialog: DialogService,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.dataSource$ = this.coge.availableCourses$.pipe(
			filter((courses) => courses !== null),
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

	get signupDraft() {
		return this.coge.draft;
	}

	handleEvent(e: CSLDataTableEvent<Action>) {
		const course$ = this.coge.availableCourses$.pipe(
			map((courses) => courses.find((course) => course.id === e.id))
		);

		if (e.action === 'DETAILS') {
			course$
				.pipe(
					switchMap((currentCourse) => {
						return this.info.open({
							confirm: 'Aggiungi',
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
									paragraph: `
										Come prima opzione: ${currentCourse.option1.length}
										<br />
										Come seconda opzione: ${currentCourse.option2.length}
										<br />
										Come terza opzione: ${currentCourse.option3.length}
									`,
								},
								{ header: 'Note', paragraph: currentCourse.notes },
							],
						});
					}),
					filter((confirmation) => confirmation),
					switchMap(() => course$)
				)
				.subscribe(({ id, title }) =>
					this.coge.pushToDraft(
						{ id, label: title },
						numberToLetter(this.currentIndex)
					)
				);
		}
	}

	confirmDraft(slot: ICourse['slot']) {
		this.dialog
			.open({
				title: `Confermi la tua iscrizione ai corsi in fascia ${slot}?`,
				text: 'Non potrai più modificare la tua scelta',
				answer: 'Sì, conferma',
				color: 'primary',
			})
			.pipe(switchMap(() => this.coge.subscribeToCourses(slot)))
			.subscribe((res) => {
				if (res.success === true) {
					this.toastr.show({
						color: 'success',
						message: `Iscrizione confermata ai corsi della fascia ${slot}`,
					});
				} else {
					this.toastr.showError();
				}
			});
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
