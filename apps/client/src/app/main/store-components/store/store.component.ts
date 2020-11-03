import { Component, OnInit } from '@angular/core';
import { IDashboardLink } from '@csl/shared';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  links: IDashboardLink[] = [
    { link: 'gadgets', title: 'Gadget' },
    { link: 'photos', title: 'Foto' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
