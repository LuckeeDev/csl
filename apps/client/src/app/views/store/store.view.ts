import { AuthState } from '@/global/store/auth';
import { Component, OnInit } from '@angular/core';
import { IDashboardLink, IUser } from '@csl/shared';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'csl-store-home',
	templateUrl: './store.view.html',
	styleUrls: ['./store.view.scss'],
})
export class StoreView implements OnInit {
	@Select(AuthState.user)
	user$: Observable<IUser>;

	defaultLinks: IDashboardLink[] = [
		{ link: 'gadgets', title: 'Gadget' },
		{ link: 'photos', title: 'Foto' },
		{ link: 'summary', title: 'Riepilogo' },
	];

	rappreLinks: IDashboardLink[] = [{ link: 'payments', title: 'Pagamenti' }];

	links$: Observable<IDashboardLink[]>;

	ngOnInit() {
		this.links$ = this.user$.pipe(
			map((user) => user.isRappreDiClasse),
			map((isRappreDiClasse) => {
				if (isRappreDiClasse) {
					return [...this.defaultLinks, ...this.rappreLinks];
				} else {
					return this.defaultLinks;
				}
			})
		);
	}
}
