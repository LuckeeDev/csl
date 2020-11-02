import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { OrdersState, OrdersStateModel } from '@bar-admin/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { faCheck, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-snack-single-class',
  templateUrl: './snack-single-class.component.html',
  styleUrls: ['./snack-single-class.component.scss'],
})
export class SnackSingleClassComponent implements OnInit {
  classID: string;
  displayedColumns: string[] = ['name', 'products', 'quantity', 'state'];

  faCheck = faCheck;
  faClock = faClock;

  @Select(OrdersState)
  orders$: Observable<OrdersStateModel>;

  constructor(private activated: ActivatedRoute) {
    this.classID = this.activated.snapshot.paramMap.get('classID');
  }

  ngOnInit(): void {}
}
