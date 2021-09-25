import { Component, HostListener, OnInit } from '@angular/core';
import { SwService } from '@global/services/sw/sw.service';
import { ToastrService } from '@csl/ui';
import PackageJSON from '../../../../package.json';
import { PageService } from '@global/services/page/page.service';
import { Store } from '@ngxs/store';
import { Auth } from '@/modules/auth/store';

@Component({
	selector: 'csl-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	v = PackageJSON.version;

	@HostListener('window:beforeinstallprompt', ['$event'])
	onBeforeInstallPrompt(e) {
		e.preventDefault();

		this.sw.installPrompt = e;
		this.sw.isInstalled = false;
	}

	@HostListener('window:appinstalled', ['$event'])
	onAppInstalled() {
		this.sw.isInstalled = true;

		this.toastr.show({
			message: 'App installata con successo',
			color: 'basic',
		});
	}

	constructor(
		public sw: SwService,
		private toastr: ToastrService,
		private page: PageService,
		private store: Store
	) {}

	ngOnInit(): void {
		this.store.dispatch(new Auth.GetUser());

		this.page.setupTitleChange();
	}
}
