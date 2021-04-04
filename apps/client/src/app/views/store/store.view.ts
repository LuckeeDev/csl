import { Component } from '@angular/core';
import { IDashboardLink } from '@csl/shared';

@Component({
	selector: 'csl-store',
	templateUrl: './store.view.html',
	styleUrls: ['./store.view.scss'],
})
export class StoreView {
	links: IDashboardLink[] = [
		{ link: 'gadgets', title: 'Gadget' },
		{ link: 'photos', title: 'Foto' },
	];
}
