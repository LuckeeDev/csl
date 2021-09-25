import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Auth } from '../../store';

@Component({
	selector: 'csl-callback',
	templateUrl: './callback.view.html',
	styleUrls: ['./callback.view.scss'],
})
export class CallbackView implements OnInit {
	constructor(
		private activated: ActivatedRoute,
		private store: Store,
		private router: Router
	) {}

	ngOnInit(): void {
		const route = this.activated.snapshot;

		const accessToken = route.queryParams.access_token;
		const provider = route.paramMap.get('provider');

		this.store.dispatch(new Auth.GetUser(provider, accessToken)).subscribe({
			complete: () => this.router.navigate(['/']),
		});
	}
}
