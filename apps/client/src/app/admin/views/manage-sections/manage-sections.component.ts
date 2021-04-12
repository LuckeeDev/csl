import { Platform, PlatformState } from '@/global/store/platform';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlatformStatus } from '@csl/shared';
import { ToastrService } from '@csl/ui';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface SectionSettingsModel {
	startDate: number | string | Date;
	startTime: string;
	endDate: number | string | Date;
	endTime: string;
}

interface Status {
	data: PlatformStatus;
	form: FormGroup;
}

@Component({
	selector: 'csl-manage-sections',
	templateUrl: './manage-sections.component.html',
	styleUrls: ['./manage-sections.component.scss'],
})
export class ManageSectionsComponent implements OnInit {
	@Select(PlatformState.status)
	platformStatus$: Observable<PlatformStatus[]>;

	status: Status[];

	constructor(private store: Store, private toastr: ToastrService) {}

	ngOnInit(): void {
		this.platformStatus$
			.pipe(
				map((status) => {
					return status.map((val) => {
						const startDate = new Date(val.status.start);
						const startTime = `${startDate.getHours()}:${startDate.getMinutes()}`;
						const endDate = new Date(val.status.end);
						const endTime = `${endDate.getHours()}:${endDate.getMinutes()}`;

						const formGroup = new FormGroup({
							startDate: new FormControl(startDate),
							startTime: new FormControl(startTime),
							endDate: new FormControl(endDate),
							endTime: new FormControl(endTime),
						});

						return {
							data: val,
							form: formGroup,
						};
					});
				})
			)
			.subscribe((val) => (this.status = val));
	}

	trackByFn(index: number, item: Status) {
		return item.data.id;
	}

	onSubmit(index: number) {
		const status = this.status[index];
		const formValue = status.form.value as SectionSettingsModel;
		const startDate = new Date(formValue.startDate);
		const [startHours, startMinutes] = formValue.startTime
			.split(':')
			.map(Number);
		startDate.setHours(startHours, startMinutes);

		const endDate = new Date(formValue.endDate);
		const [endHours, endMinutes] = formValue.endTime.split(':').map(Number);
		endDate.setHours(endHours, endMinutes);

		this.store
			.dispatch(
				new Platform.UpdateStatus({
					id: status.data.id,
					status: { start: startDate.toJSON(), end: endDate.toJSON() },
				})
			)
			.subscribe({
				next: () =>
					this.toastr.show({
						color: 'basic',
						message: 'Stato aggiornato con successo',
					}),
				error: (err) => this.toastr.showError(err),
			});
	}
}
