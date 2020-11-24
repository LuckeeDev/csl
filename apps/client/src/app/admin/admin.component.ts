import { Component, OnInit } from '@angular/core';
import { IDashboardLink } from '@csl/shared';

@Component({
  selector: 'csl-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  links: IDashboardLink[] = [
    { link: '.', title: 'Home' },
    { link: 'classi', title: 'Classi' },
    { link: 'accounts', title: 'Account' },
    { link: 'commissioni', title: 'Commissioni' },
    { link: 'csv', title: 'CSV' },
    { link: 'reports', title: 'Segnalazioni' },
    { link: 'errors', title: 'Errori' },
    { link: 'events', title: 'Eventi' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
