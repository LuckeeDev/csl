import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
	selector: 'csl-service-account',
	templateUrl: './service-account.view.html',
	styleUrls: ['./service-account.view.scss'],
})
export class ServiceAccountView implements OnInit {
	setupURL = `${environment.api}/service/setup`;

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.http.get('/service').subscribe(console.log);
	}
}
