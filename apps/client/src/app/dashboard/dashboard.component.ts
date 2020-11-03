import { Component, OnInit } from '@angular/core';
import { IDashboardLink } from '@csl/shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  links: IDashboardLink[] = [
    { link: '.', title: 'Home' },
    { link: 'orders', title: 'Ordini' },
    { link: 'checkout', title: 'Pagamenti' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
