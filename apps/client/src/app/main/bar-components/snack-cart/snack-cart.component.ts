import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISnackOrder, ISnack, IUser } from '@csl/shared';
import { SnacksService } from '@global/services/snacks/snacks.service';
import { DialogService, ToastrService } from '@csl/ui';
import { AuthService } from '@global/services/auth/auth.service';
import { Select } from '@ngxs/store';
import { AuthState } from '@/global/store/auth';

@Component({
	selector: 'csl-snack-cart',
	templateUrl: './snack-cart.component.html',
	styleUrls: ['./snack-cart.component.scss'],
})
export class SnackCartComponent implements OnInit {
	@Select(AuthState.user)
	user$: Observable<IUser>;

	order$: Observable<ISnackOrder>;
	displayedColumns: string[] = ['name', 'quantity', 'options', 'confirmed'];

	constructor(
		private snacksService: SnacksService,
		private dialog: DialogService,
		private toastr: ToastrService,
		public auth: AuthService
	) {}

	ngOnInit(): void {
		this.order$ = this.snacksService.getCart();
	}

	deleteProduct(id: ISnack['id']) {
		this.dialog
			.open({
				title: 'Sei sicuro?',
				text: 'Potrai comunque riordinarlo in seguito',
				answer: 'Sì, elimina',
				color: 'warn',
			})
			.subscribe(() => {
				this.snacksService.deleteFromCart(id).subscribe((res) => {
					if (res.success === true) {
						this.toastr.show({
							message: 'Prodotto eliminato',
							color: 'accent',
							action: 'Chiudi',
							duration: 5000,
						});

						this.order$ = this.snacksService.getCart();
					} else if (res.success === false && res.err === 'order-confirmed') {
						this.toastr.show({
							message: 'Ordine già confermato',
							color: 'accent',
							action: 'Chiudi',
							duration: 5000,
						});
					} else {
						this.toastr.showError();
					}
				});
			});
	}

	confirmOrder() {
		this.dialog
			.open({
				title: 'Confermi il tuo ordine?',
				text: 'Non potrai più modificarlo',
				answer: 'Sì, conferma',
				color: 'primary',
			})
			.subscribe(() => {
				this.snacksService.confirmOrder().subscribe((res) => {
					if (res.success === true) {
						this.toastr.show({
							message: 'Ordine confermato',
							color: 'success',
							action: 'Chiudi',
							duration: 5000,
						});
					} else if (res.success === false && res.err === 'no-credit') {
						this.toastr.show({
							message: 'Non hai sufficiente credito!',
							color: 'warn',
							action: 'Chiudi',
							duration: 5000,
						});
					} else {
						this.toastr.showError();
					}

					this.order$ = this.snacksService.getCart();
					this.auth.getUser({ firebaseToken: false, platformStatus: false });
				});
			});
	}
}
