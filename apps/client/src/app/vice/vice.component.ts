import { Component, OnInit } from '@angular/core';
import { ILink } from '@global/@types/dashboard';

@Component({
  selector: 'app-vice',
  templateUrl: './vice.component.html',
  styleUrls: ['./vice.component.scss'],
})
export class ViceComponent implements OnInit {
  links: ILink[] = [
    { link: '.', title: 'Home' },
    { link: 'upload', title: 'Accounts' },
    { link: 'classi', title: 'Classi' },
    { link: 'coge', title: 'Cogestione' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
