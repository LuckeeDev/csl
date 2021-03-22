import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CogeService } from '@global/services/coge/coge.service';
import { IHttpRes, ICourse } from '@csl/shared';
import { DialogService, ToastrService } from '@csl/ui';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'csl-create-course',
	templateUrl: './create-course.component.html',
	styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent {
	courseForm: FormGroup = this._fb.group({
		title: ['', Validators.required],
		description: ['', Validators.required],
		notes: [''],
		slot: ['', Validators.required],
		category: ['', Validators.required],
		speakers: this._fb.array([], Validators.required),
		max: [100, Validators.required],
	});

	availableSlots = ['a', 'b', 'c', 'd', 'e', 'f'];
	availableCategories: ICourse['category'][] = [
		'Approfondimento',
		'Cineforum',
		'Dibattito',
		'Seminario',
		'Tempo libero',
	];

	constructor(
		private _fb: FormBuilder,
		private coge: CogeService,
		private toastr: ToastrService,
		private router: Router,
		private dialog: DialogService,
		private route: ActivatedRoute
	) {}

	get speakers() {
		return this.courseForm.get('speakers') as FormArray;
	}

	addSpeaker() {
		this.speakers.push(
			this._fb.group({
				name: ['', Validators.required],
				classID: ['', Validators.required],
			})
		);
	}

	removeSpeaker(i: number) {
		this.speakers.removeAt(i);
	}

	onSubmit() {
		this.dialog
			.open({
				title: 'Creare il corso?',
				text: 'Dopo aver confermato, non potrai più modificarlo',
				color: 'primary',
				answer: 'Sì, crea',
			})
			.subscribe(() => {
				this.coge
					.createCourse(this.courseForm.value)
					.subscribe((res: IHttpRes<any>) => {
						if (res.success === true) {
							this.toastr.show({
								color: 'success',
								message: 'Corso creato con successo',
							});

							this.router.navigate(['..'], {
								relativeTo: this.route,
							});
						} else {
							this.toastr.showError();
						}
					});
			});
	}

	checkboxChange(e, val: string) {
		const slots: string[] = this.courseForm.value.slots;

		if (e.checked === true) {
			slots.push(val);

			slots.sort();
		} else if (e.checked === false) {
			const i = slots.findIndex((x) => x === val);

			slots.splice(i, 1);
		}

		this.courseForm.patchValue({ slots });
	}
}
