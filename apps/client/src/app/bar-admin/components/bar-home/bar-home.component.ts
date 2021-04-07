import { AuthState } from '@/global/store/auth';
import { Component } from '@angular/core';
import { IUser } from '@csl/shared';
import { DialogService } from '@csl/ui';
import { AuthService } from '@global/services/auth/auth.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'csl-bar-home',
	templateUrl: './bar-home.component.html',
	styleUrls: ['./bar-home.component.scss'],
})
export class BarHomeComponent {
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
