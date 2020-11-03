import { Component, OnInit } from '@angular/core';
import { IDashboardLink } from '@csl/shared';

@Component({
  selector: 'app-qp-admin',
  templateUrl: './qp-admin.component.html',
  styleUrls: ['./qp-admin.component.scss'],
})
export class QpAdminComponent implements OnInit {
  links: IDashboardLink[] = [
    { link: '.', title: 'Home' },
    { link: 'editor', title: 'Articoli' },
  ];

  constructor() {}

  ngOnInit() {}
}
