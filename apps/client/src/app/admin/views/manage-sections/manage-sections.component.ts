import { PlatformState } from '@/global/store/platform';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlatformStatus } from '@csl/shared';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface SectionSettingsModel {
	startDate: number | string | Date;
	startTime: string;
	endDate: number | string | Date;
	endTime: string;
}

@Component({
	selector: 'csl-manage-sections',
	templateUrl: './manage-sections.component.html',
	styleUrls: ['./manage-sections.component.scss'],
})
export class ManageSectionsComponent implements OnInit {
	@Select(PlatformState.status)
	platformStatus$: Observable<PlatformStatus[]>;

	form = new FormGroup({
		startDate: new FormControl(''),
		startTime: new FormControl(''),
		endDate: new FormControl(''),
		endTime: new FormControl(''),
	});

	constructor() {}

	ngOnInit(): void {
		this.platformStatus$
			.pipe(map((val) => val.find((x) => x.id === 'store')))
			.subscribe(({ status: { start, end } }) => {
				const startDate = new Date(start);
				const startTime = `${startDate.getHours()}:${startDate.getMinutes()}`;
				const endDate = new Date(end);
				const endTime = `${endDate.getHours()}:${endDate.getMinutes()}`;

				this.form = new FormGroup({
					startDate: new FormControl(start),
					startTime: new FormControl(startTime),
					endDate: new FormControl(end),
					endTime: new FormControl(endTime),
				});
			});
	}

	onSubmit() {
		const formValue = this.form.value as SectionSettingsModel;
		const startDate = new Date(formValue.startDate);
		const [startHours, startMinutes] = formValue.startTime
			.split(':')
			.map(Number);
		startDate.setHours(startHours, startMinutes);

		const endDate = new Date(formValue.endDate);
		const [endHours, endMinutes] = formValue.endTime.split(':').map(Number);
		endDate.setHours(endHours, endMinutes);

		console.log(startDate.toJSON(), endDate.toJSON());
	}
}
