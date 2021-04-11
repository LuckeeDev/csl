import { Component } from '@angular/core';
import { IDashboardLink } from '@csl/shared';

@Component({
	selector: 'csl-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
	links: IDashboardLink[] = [
		{ link: '.', title: 'Home' },
		{ link: 'csv', title: 'CSV' },
		{ link: 'classi', title: 'Classi' },
		{ link: 'accounts', title: 'Account' },
		{ link: 'commissioni', title: 'Commissioni' },
		{ link: 'reports', title: 'Segnalazioni' },
		{ link: 'errors', title: 'Errori' },
		{ link: 'events', title: 'Eventi' },
		{ link: 'coge', title: 'Coge' },
		{ link: 'service', title: 'Account di Servizio' },
		{ link: 'manage-sections', title: 'Gestisci Sezioni' },
	];
}
