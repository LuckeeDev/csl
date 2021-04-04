import { Component, Input } from '@angular/core';

import { AuthService } from '@global/services/auth/auth.service';

import { IDashboardLink } from '@csl/shared';

@Component({
	selector: 'csl-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
	@Input()
	v: string;

	toggled = false;

	currentYear = new Date().getFullYear();

	links: IDashboardLink[] = [
		{ title: 'Home', link: '' },
		{ title: 'Comitato', link: 'comitato' },
		{ title: 'ASL', link: 'asl' },
		{ title: 'Consulta', link: 'consulta' },
		{ title: 'PortArti', link: 'portarti' },
		{ title: 'QP', link: 'qp' },
		{ title: 'Store', link: 'store' },
		{ title: 'Informazioni', link: 'info' },
	];

	constructor(public auth: AuthService) {}
}
