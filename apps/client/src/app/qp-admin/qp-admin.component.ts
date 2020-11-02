import { Component, OnInit } from '@angular/core';
import { ILink } from '@global/@types/dashboard';

@Component({
  selector: 'app-qp-admin',
  templateUrl: './qp-admin.component.html',
  styleUrls: ['./qp-admin.component.scss'],
})
export class QpAdminComponent implements OnInit {
  links: ILink[] = [
    { link: '.', title: 'Home' },
    { link: 'editor', title: 'Articoli' },
  ];

  constructor() {}

  ngOnInit() {}
}
