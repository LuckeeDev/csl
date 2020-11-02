import { Component, OnInit } from '@angular/core';
import { ILink } from '@global/@types/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  links: ILink[] = [
    { link: '.', title: 'Home' },
    { link: 'orders', title: 'Ordini' },
    { link: 'checkout', title: 'Pagamenti' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
