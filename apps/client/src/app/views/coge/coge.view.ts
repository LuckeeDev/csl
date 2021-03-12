import { CogeService } from '@/global/services/coge/coge.service';
import { Component, OnInit } from '@angular/core';
import {
	CSLDataTableDisplayedColumns,
	CSLDataTableSource,
	ICourse,
} from '@csl/shared';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

type Courses = Record<ICourse['slot'], CSLDataTableSource<ICourse>>;

@Component({
	selector: 'csl-coge',
	templateUrl: './coge.view.html',
	styleUrls: ['./coge.view.scss'],
})
export class CogeView implements OnInit {
	courses$: Observable<Courses>;
	slots$: Observable<ICourse['slot'][]>;

	displayedColumns: CSLDataTableDisplayedColumns<keyof ICourse> = [
		{ type: 'data', id: 'title', label: 'Titolo' },
	];

	constructor(private coge: CogeService) {}

	ngOnInit(): void {
		this.courses$ = this.coge.getAllCourses().pipe(
			filter(({ success }) => success),
			map(({ data }) => ({
				a: this._convertToDataSource(this._onlySlot('a', data)),
				b: this._convertToDataSource(this._onlySlot('b', data)),
				c: this._convertToDataSource(this._onlySlot('c', data)),
				d: this._convertToDataSource(this._onlySlot('d', data)),
				e: this._convertToDataSource(this._onlySlot('e', data)),
				f: this._convertToDataSource(this._onlySlot('f', data)),
			}))
		);

		this.slots$ = this.courses$.pipe(
			map((courses) => Object.keys(courses) as ICourse['slot'][])
		);
	}

	private _onlySlot(onlySlot: ICourse['slot'], data: ICourse[]) {
		return data.filter(({ slot }) => slot === onlySlot);
	}

	private _convertToDataSource(data: ICourse[]): CSLDataTableSource<ICourse> {
		return data.map((course) => ({
			id: course.id,
			data: course,
		}));
	}
}
