import { CogeService } from '@/global/services/coge/coge.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '@csl/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'csl-course-details',
	templateUrl: './course-details.view.html',
	styleUrls: ['./course-details.view.scss'],
})
export class CourseDetailsView implements OnInit {
	id: ICourse['id'];
	course$: Observable<ICourse>;

	constructor(private route: ActivatedRoute, private coge: CogeService) {}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		
		this.course$ = this.coge.availableCourses$.pipe(
			map((courses) => courses.find((x) => x.id === this.id))
		);
	}
}
