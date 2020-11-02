import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Classes, ClassState, ClassStateModel } from '@shared/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-classi',
  templateUrl: './classi.component.html',
  styleUrls: ['./classi.component.scss'],
})
export class ClassiComponent implements OnInit {
  @Select(ClassState)
  state$: Observable<ClassStateModel>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Classes.Get());
  }
}
