import { Component, OnInit } from '@angular/core';
import { StrapiAuthService } from '@csl/strapi';

@Component({
	selector: 'csl-google',
	templateUrl: './google.view.html',
	styleUrls: ['./google.view.scss'],
})
export class GoogleView implements OnInit {
	constructor(private strapiAuth: StrapiAuthService) {}

	ngOnInit(): void {
		this.strapiAuth.getProfile().subscribe(console.log);
	}
}
