import { Component, OnInit } from '@angular/core';
import { IDashboardLink } from '@csl/shared';

@Component({
  selector: 'app-rappre',
  templateUrl: './rappre.component.html',
  styleUrls: ['./rappre.component.scss'],
})
export class RappreComponent implements OnInit {
  links: IDashboardLink[] = [
    { link: '.', title: 'Home' },
    { link: 'classi', title: 'Classi' },
    { link: 'gadgets', title: 'Gadget' },
    { link: 'photos', title: 'Foto' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
