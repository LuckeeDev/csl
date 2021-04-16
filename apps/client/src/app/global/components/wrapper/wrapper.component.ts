import { Component, Input } from '@angular/core';

import { AuthService } from '@global/services/auth/auth.service';

import { IDashboardLink, IUser } from '@csl/shared';
import { Select } from '@ngxs/store';
import { AuthState } from '@/global/store/auth';
import { Observable } from 'rxjs';

@Component({
	selector: 'csl-wrapper',
	templateUrl: './wrapper.component.html',
	styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent {
	@Input()
	v: string;

	@Select(AuthState.user)
	user$: Observable<IUser>;

	@Select(AuthState.loading)
	authLoading$: Observable<boolean>;

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
