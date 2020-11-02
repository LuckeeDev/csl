import { Component, OnInit } from '@angular/core';
import { ILink } from '@global/@types/dashboard';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  links: ILink[] = [
    { link: 'gadgets', title: 'Gadget' },
    { link: 'photos', title: 'Foto' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
