import { Component, OnInit } from '@angular/core';
import { IDashboardLink } from '@csl/shared';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  links: IDashboardLink[] = [
    { link: '.', title: 'Prodotti' },
    { link: 'cart', title: 'Carrello' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
