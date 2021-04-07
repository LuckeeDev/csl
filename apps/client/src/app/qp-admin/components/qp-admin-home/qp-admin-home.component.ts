import { Component } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';
import { DialogService } from '@csl/ui';
import { Select } from '@ngxs/store';
import { AuthState } from '@/global/store/auth';
import { Observable } from 'rxjs';
import { IUser } from '@csl/shared';

@Component({
	selector: 'csl-qp-admin-home',
	templateUrl: './qp-admin-home.component.html',
	styleUrls: ['./qp-admin-home.component.scss'],
})
export class QpAdminHomeComponent {
	@Select(AuthState.user)
	user$: Observable<IUser>;

	constructor(private dialog: DialogService, private auth: AuthService) {}

	signOut() {
		this.dialog
			.open({
				title: 'Sei sicuro di voler uscire?',
				text: 'Ciò che stavi facendo potrebbe non essere salvato',
				color: 'warn',
				answer: 'Sì, esci',
			})
			.subscribe(() => {
				this.auth.signOut();
			});
	}
}
