import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from '@csl/ui';
import { SwService } from '@global/services/sw/sw.service';

@Component({
	selector: 'csl-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	isInstalled: boolean;
	loginState: 'failed' | null;

	constructor(
		private router: Router,
		private toastr: ToastrService,
		public sw: SwService
	) {
		this.loginState = this.router.url.includes('login-failed')
			? 'failed'
			: null;
	}

	ngOnInit(): void {
		if (this.loginState === 'failed') {
			this.toastr.showError('Il login non è andato a buon fine!');

			this.router.navigate(['/']);
		}
	}

	installPrompt() {
		this.sw.installPrompt.prompt();
	}
}
