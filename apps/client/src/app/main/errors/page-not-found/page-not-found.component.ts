import { Component, Input } from '@angular/core';

@Component({
  selector: 'csl-error-page',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
	@Input()
	src: string;

	@Input()
	message: string;
}
