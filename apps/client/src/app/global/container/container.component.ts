import { Component, OnInit } from '@angular/core';

import { AuthService } from '@global/services/auth/auth.service';

import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IDashboardLink } from '@csl/shared';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  toggled: boolean = false;

  faBars = faBars;
  faTimes = faTimes;

  currentYear = new Date().getFullYear();

  links: IDashboardLink[] = [
    { title: 'Home', link: '' },
    { title: 'Comitato', link: 'comitato' },
    { title: 'ASL', link: 'asl' },
    { title: 'Consulta', link: 'consulta' },
    { title: 'PortArti', link: 'portarti' },
    { title: 'QP', link: 'qp' },
    { title: 'Store', link: 'store' },
    { title: 'Bar', link: 'bar' },
  ];

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
