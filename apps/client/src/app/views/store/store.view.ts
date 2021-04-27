import { AuthState } from '@/global/store/auth';
import { PlatformState } from '@/global/store/platform';
import { Component, OnInit } from '@angular/core';
import { IDashboardLink, IUser, PlatformStatus } from '@csl/shared';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

interface ReadyStatus {
	ready: boolean;
}

@Component({
	selector: 'csl-store-home',
	templateUrl: './store.view.html',
	styleUrls: ['./store.view.scss'],
})
export class StoreView implements OnInit {
	statusID: PlatformStatus['id'] = 'store';

	@Select(AuthState.user)
	user$: Observable<IUser>;

	@Select(PlatformState.status)
	platformStatus$: Observable<PlatformStatus[]>;

	readyStatus$: Observable<ReadyStatus>;

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

		const sectionStatus$ = this.platformStatus$.pipe(
			distinctUntilChanged(),
			map((value) => {
				const { status } = value.find((x) => x.id === this.statusID);

				return {
					time: new Date().getTime(),
					start: new Date(status.start).getTime(),
					end: new Date(status.end).getTime(),
				};
			})
		);

		this.readyStatus$ = sectionStatus$.pipe(
			map(({ start, end, time: currentTime }) => {
				const distanceFromStart = start - currentTime;
				const distanceFromEnd = currentTime - end;

				if (distanceFromStart > 0 || distanceFromEnd > 0) {
					return { ready: false };
				} else {
					return { ready: true };
				}
			})
		);
	}
}
