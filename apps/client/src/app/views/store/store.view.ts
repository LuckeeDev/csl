import { AuthState } from '@/global/store/auth';
import { Component, HostListener, OnInit } from '@angular/core';
import {
	IDashboardLink,
	IUser,
	PlatformStatus,
	ProductInUserCart,
} from '@csl/shared';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'csl-store-home',
	templateUrl: './store.view.html',
	styleUrls: ['./store.view.scss'],
})
export class StoreView implements OnInit {
	statusID: PlatformStatus['id'] = 'store';

	@Select(AuthState.user)
	user$: Observable<IUser>;

	@Select(AuthState.orderDraft)
	orderDraft$: Observable<ProductInUserCart>;

	defaultLinks: IDashboardLink[] = [
		{ link: 'gadgets', title: 'Gadget' },
		{ link: 'photos', title: 'Foto' },
		{ link: 'summary', title: 'Riepilogo' },
	];

	rappreLinks: IDashboardLink[] = [
		{ link: 'class', title: 'La tua classe' },
		// { link: 'payments', title: 'Pagamenti' },
	];

	links$: Observable<IDashboardLink[]>;

	@HostListener('window:beforeunload', ['$event'])
	handleClose(e: BeforeUnloadEvent) {
		this.orderDraft$.subscribe((draft) => {
			if (draft) {
				e.returnValue = false;
			}
		});
	}

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
