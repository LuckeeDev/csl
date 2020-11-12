import { Component, OnInit } from '@angular/core';
import { IDashboardLink } from '@csl/shared';

@Component({
  selector: 'csl-comitato',
  templateUrl: './comitato.component.html',
  styleUrls: ['./comitato.component.scss']
})
export class ComitatoComponent implements OnInit {
  links: IDashboardLink[] = [
    { link: 'commissione/arte', title: 'Commissione Arte' },
    { link: 'commissione/biblioteca', title: 'Commissione Biblioteca' },
    { link: 'commissione/cinema', title: 'Commissione Cinema' },
    { link: 'commissione/dibattito', title: 'Commissione Dibattito' },
    { link: 'commissione/green', title: 'Commissione Green' },
    { link: 'commissione/feste', title: 'Commissione Feste' },
    { link: 'commissione/lir', title: 'Lussana in Ripresa' },
    { link: 'commissione/musica', title: 'Commissione Musica' },
    { link: 'commissione/omnia', title: 'Commissione Omnia' },
    { link: 'commissione/sport', title: 'Commissione Sport' },
    { link: 'commissione/tutoring', title: 'Commissione Tutoring' },
    { link: 'commissione/vale', title: 'Commissione VALE' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
