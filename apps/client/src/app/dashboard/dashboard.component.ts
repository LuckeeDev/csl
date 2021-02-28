import { Component } from '@angular/core';
import { IDashboardLink } from '@csl/shared';

@Component({
  selector: 'csl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  links: IDashboardLink[] = [
    { link: '.', title: 'Home' },
    { link: 'orientamento', title: 'Orientamento' },
    // { link: 'coge', title: 'Cogestione' },
    { link: 'orders', title: 'Ordini' },
    // { link: 'checkout', title: 'Pagamenti' },
  ];
}
