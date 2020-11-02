import { Component, OnInit } from '@angular/core';
import { ILink } from '@global/@types/dashboard';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  links: ILink[] = [
    { link: '.', title: 'Home' },
    { link: 'accounts', title: 'Account' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
