import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import {
  OrdersState,
  OrdersStateModel,
} from '@bar-admin/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-snack-orders',
  templateUrl: './snack-orders.component.html',
  styleUrls: ['./snack-orders.component.scss'],
})
export class SnackOrdersComponent implements OnInit {
  @Select(OrdersState)
  orders$: Observable<OrdersStateModel>;

  constructor() {}

  ngOnInit(): void {
  }
}
