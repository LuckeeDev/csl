import { CogeService } from '@/global/services/coge/coge.service';
import { numberToLetter } from '@/utils/numberToLetter';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import {
	CSLDataTableAction,
	CSLDataTableDisplayedColumns,
	CSLDataTableEvent,
	CSLDataTableSource,
	ICourse,
} from '@csl/shared';
import { DialogService, InfoDialogService, ToastrService } from '@csl/ui';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { DeviceService } from '@csl/ui';

type Courses = Record<ICourse['slot'], CSLDataTableSource<ICourse>>;

type Action = 'DETAILS' | 'ADD';

interface MissingTime {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	distance: number;
}

@Component({
	selector: 'csl-coge',
	templateUrl: './coge.view.html',
	styleUrls: ['./coge.view.scss'],
})
export class CogeView implements OnInit, OnDestroy {
	slotDate: Record<ICourse['slot'], number> = {
		a: new Date('Mar 29, 2021 08:45:00').getTime(),
		b: new Date('Mar 29, 2021 10:50:00').getTime(),
		c: new Date('Mar 30, 2021 08:45:00').getTime(),
		d: new Date('Mar 30, 2021 10:50:00').getTime(),
		e: new Date('Mar 31, 2021 08:45:00').getTime(),
		f: new Date('Mar 31, 2021 10:50:00').getTime(),
	};

	missingTime: Record<ICourse['slot'], MissingTime>;

	timer: Observable<number> = interval(1000);
	timerSubscription: Subscription;

	currentIndex = 0;

	dataSource$: Observable<Courses>;
	slots$: Observable<ICourse['slot'][]>;

	actions: CSLDataTableAction<Action>[] = [
		{ type: 'basic', id: 'DETAILS', label: 'Dettagli' },
	];

	displayedColumns: CSLDataTableDisplayedColumns<keyof ICourse> = [
		{ type: 'data', id: 'title', label: 'Titolo' },
		{ type: 'actions', id: 'manage', label: 'Opzioni' },
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
		private toastr: ToastrService,
		private device: DeviceService
	) {}

	ngOnInit(): void {
		this.timerSubscription = this.timer.subscribe(() => {
			this.missingTime = {
				a: this._calculateMissingTime('a'),
				b: this._calculateMissingTime('b'),
				c: this._calculateMissingTime('c'),
				d: this._calculateMissingTime('d'),
				e: this._calculateMissingTime('e'),
				f: this._calculateMissingTime('f'),
			};
		});

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

	ngOnDestroy() {
		this.timerSubscription.unsubscribe();
	}

	get signupDraft() {
		return this.coge.draft;
	}

	courseFromID(id: ICourse['id']) {
		return this.coge.availableCourses$.pipe(
			map((courses) => courses.find((x) => x.id === id)),
			filter((course) => (course ? true : false))
		);
	}

	handleEvent(e: CSLDataTableEvent<Action>) {
		const course$ = this.coge.availableCourses$.pipe(
			map((courses) => courses.find((course) => course.id === e.id))
		);

		if (e.action === 'DETAILS') {
			this._handleDetails(course$);
		} else if (e.action === 'ADD') {
			this._handleAdd(course$);
		}
	}

	confirmDraft(slot: ICourse['slot']) {
		this.dialog
			.open({
				title: `Confermi la tua iscrizione al corso in fascia ${slot}?`,
				text: 'Non potrai più modificare la tua scelta',
				answer: 'Sì, conferma',
				color: 'primary',
			})
			.pipe(switchMap(() => this.coge.subscribeToCourses(slot)))
			.subscribe((res) => {
				if (res.success === true) {
					this.toastr.show({
						color: 'success',
						message: `Iscrizione confermata al corso della fascia ${slot}`,
					});
				} else {
					this.toastr.showError("Errore durante l'iscrizione al corso.");
				}
			});
	}

	private _calculateMissingTime(slot: ICourse['slot']): MissingTime {
		// Get today's date and time
		const now = new Date().getTime();

		// Find the distance between now and the count down date
		const distance = this.slotDate[slot] - now;

		// Time calculations for days, hours, minutes and seconds
		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		return { days, hours, minutes, seconds, distance };
	}
	
	private _onlySlot(onlySlot: ICourse['slot'], data: ICourse[]) {
		return data.filter(({ slot }) => slot === onlySlot);
	}

	private _preventFullEvent(
		actions: CSLDataTableAction<Action>[],
		course: ICourse
	): CSLDataTableAction<Action>[] {
		const newActions =
			this.device.type === 'small'
				? actions.filter((x) => x.id !== 'ADD')
				: actions;

		if (
			this.signupDraft[course.slot].confirmed === true ||
			course.signups.length >= course.max - course.speakers.length
		) {
			return newActions.map((action) =>
				action.id === 'ADD' ? { ...action, disabled: true } : action
			);
		} else {
			return newActions;
		}
	}

	private _convertToDataSource(data: ICourse[]): CSLDataTableSource<ICourse> {
		return data.map((course) => ({
			id: course.id,
			data: course,
			actions: this._preventFullEvent(this.actions, course),
		}));
	}

	private _handleAdd(course$: Observable<ICourse>) {
		course$.subscribe({
			next: ({ id, title }) => {
				this._pushToDraft(id, title);
			},
		});
	}

	private _handleDetails(course$: Observable<ICourse>) {
		course$
			.pipe(
				switchMap((currentCourse) => {
					return this.info.open({
						confirm: 'Seleziona',
						title: currentCourse.title,
						confirmDisabled: true,
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
				}),
				filter((confirmation) => confirmation),
				switchMap(() => course$)
			)
			.subscribe(({ id, title }) => this._pushToDraft(id, title));
	}

	private _pushToDraft(id: string, label: string) {
		this.coge.pushToDraft({ id, label }, numberToLetter(this.currentIndex));
	}
}
