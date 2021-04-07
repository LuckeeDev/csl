import { Component, OnInit } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';
import { ICommissione, IDashboardLink, IUser } from '@csl/shared';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthState } from '@/global/store/auth';
import { Select } from '@ngxs/store';

@Component({
	selector: 'csl-referente',
	templateUrl: './referente.component.html',
	styleUrls: ['./referente.component.scss'],
})
export class ReferenteComponent implements OnInit {
	@Select(AuthState.user)
	user$: Observable<IUser>;

	links: IDashboardLink[] = [
		{ title: 'Home', link: '.' },
		{ title: 'Gestisci pagina', link: 'editor' },
		{ title: 'Guida', link: 'guide' },
	];

	commissione$: Observable<ICommissione['id']>;

	constructor(private auth: AuthService) {}

	ngOnInit(): void {
		this.commissione$ = this.user$.pipe(map((user) => user.isReferente));
	}
}
