import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StrapiAuthService } from '@csl/strapi';

@Component({
	selector: 'csl-callback',
	templateUrl: './callback.view.html',
	styleUrls: ['./callback.view.scss'],
})
export class CallbackView implements OnInit {
	constructor(
		private strapiAuth: StrapiAuthService,
		private activated: ActivatedRoute
	) {}

	ngOnInit(): void {
		const route = this.activated.snapshot;
		
		const accessToken = route.queryParams.access_token;
		const provider = route.paramMap.get('provider');

		this.strapiAuth.getProfile(provider, accessToken).subscribe(console.log);
	}
}
