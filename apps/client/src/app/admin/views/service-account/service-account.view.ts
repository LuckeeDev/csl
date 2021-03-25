import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { IHttpRes, IUser } from '@csl/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'csl-service-account',
	templateUrl: './service-account.view.html',
	styleUrls: ['./service-account.view.scss'],
})
export class ServiceAccountView implements OnInit {
	setupURL = `${environment.api}/service/setup`;
	serviceAccount$: Observable<IUser>;

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.serviceAccount$ = this.http.get<IHttpRes<IUser>>('/service').pipe(map((res) => res.data));
	}
}
