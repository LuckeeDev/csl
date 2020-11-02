import { Component, OnInit } from '@angular/core';
import { ILink } from '@global/@types/dashboard';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  links: ILink[] = [
    { link: '.', title: 'Prodotti' },
    { link: 'cart', title: 'Carrello' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
