import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDashboardLink } from '@csl/shared';
import { Store } from '@ngxs/store';
import { OrdersConnection } from './store';

@Component({
  selector: 'app-bar-admin',
  templateUrl: './bar-admin.component.html',
  styleUrls: ['./bar-admin.component.scss'],
})
export class BarAdminComponent implements OnInit, OnDestroy {
  links: IDashboardLink[] = [
    { link: '.', title: 'Home' },
    { link: 'orders', title: 'Ordini' },
    { link: 'manage', title: 'Prodotti' },
    { link: 'classi', title: 'Classi' },
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new OrdersConnection.Open());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new OrdersConnection.Close());
  }
}
