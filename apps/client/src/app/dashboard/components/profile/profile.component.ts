import { Component } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';
import { DialogService } from '@csl/ui';
import { SwService } from '@global/services/sw/sw.service';
import { AuthState } from '@/global/store/auth';
import { Observable } from 'rxjs';
import { IUser } from '@csl/shared';
import { Select } from '@ngxs/store';

@Component({
	selector: 'csl-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
	@Select(AuthState.user)
	user$: Observable<IUser>;

	constructor(
		public auth: AuthService,
		private dialog: DialogService,
		public sw: SwService
	) {}

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
