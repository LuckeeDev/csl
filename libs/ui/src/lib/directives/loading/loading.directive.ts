import {
	ComponentFactory,
	ComponentFactoryResolver,
	ComponentRef,
	Directive,
	Input,
	OnChanges,
	Renderer2,
	SimpleChanges,
	ViewContainerRef,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSpinner } from '@angular/material/progress-spinner';

@Directive({
	// Disable ESLint rule to allow a simple loading name
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: `button[mat-button][loading],
	button[mat-raised-button][loading],
	button[mat-icon-button][loading],
	button[mat-fab][loading],
	button[mat-mini-fab][loading],
	button[mat-stroked-button][loading],
	button[mat-flat-button][loading]`,
})
export class LoadingDirective implements OnChanges {
	@Input() loading: boolean;

	private spinnerFactory: ComponentFactory<MatSpinner>;
	private spinner: ComponentRef<MatSpinner>;

	constructor(
		private matButton: MatButton,
		private componentFactoryResolver: ComponentFactoryResolver,
		private viewContainerRef: ViewContainerRef,
		private renderer: Renderer2
	) {
		this.spinnerFactory = this.componentFactoryResolver.resolveComponentFactory(
			MatSpinner
		);
	}

	get nativeElement(): HTMLElement {
		return this.matButton._elementRef.nativeElement;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes.loading) {
			return;
		}

		if (changes.loading.currentValue) {
			this.matButton._elementRef.nativeElement.classList.add('mat-loading');
			this.matButton.disabled = true;
			this.createSpinner();
		} else if (!changes.loading.firstChange) {
			this.matButton._elementRef.nativeElement.classList.remove('mat-loading');
			this.matButton.disabled = false;
			this.destroySpinner();
		}
	}

	private createSpinner(): void {
		if (!this.spinner) {
			this.spinner = this.viewContainerRef.createComponent(this.spinnerFactory);

			this.spinner.instance.color = 'primary';
			this.spinner.instance.diameter = 20;
			this.spinner.instance.mode = 'indeterminate';
			
			this.renderer.appendChild(
				this.nativeElement,
				this.spinner.instance._elementRef.nativeElement
			);
		}
	}

	private destroySpinner(): void {
		if (this.spinner) {
			this.spinner.destroy();
			this.spinner = null;
		}
	}
}
