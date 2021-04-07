import { Component } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';
import { DialogService } from '@csl/ui';
import { AuthState } from '@/global/store/auth';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IUser } from '@csl/shared';

@Component({
	selector: 'csl-rappre-home',
	templateUrl: './rappre-home.component.html',
	styleUrls: ['./rappre-home.component.scss'],
})
export class RappreHomeComponent {
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
