import { Component } from '@angular/core';
import { IDashboardLink } from '@csl/shared';

@Component({
	selector: 'csl-rappre',
	templateUrl: './rappre.component.html',
	styleUrls: ['./rappre.component.scss'],
})
export class RappreComponent {
	links: IDashboardLink[] = [
		{ link: '.', title: 'Home' },
		{ link: 'classi', title: 'Classi' },
		{ link: 'editor', title: 'Gestisci pagina' },
		{ link: 'orientamento', title: 'Orientamento' },
		{ link: 'gadgets', title: 'Gadget' },
		// { link: 'photos', title: 'Foto' },
	];
}
