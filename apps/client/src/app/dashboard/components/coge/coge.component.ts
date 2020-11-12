import { Component, OnInit } from '@angular/core';
import { CogeService } from '@global/services/coge/coge.service';
import { ICourse } from '@csl/shared';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'csl-coge',
  templateUrl: './coge.component.html',
  styleUrls: ['./coge.component.scss'],
})
export class CogeComponent implements OnInit {
  courses$: Observable<ICourse[]>;
  displayedColumns = ['title', 'description', 'duration', 'slots', 'speakers', 'status'];

  constructor(private coge: CogeService) {}

  ngOnInit(): void {
    this.courses$ = this.coge.getCourses().pipe(map(res => res.data));
  }
}
