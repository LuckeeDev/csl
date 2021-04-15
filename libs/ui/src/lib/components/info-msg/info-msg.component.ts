import { Component, Input } from '@angular/core';

@Component({
	selector: 'csl-info-msg',
	templateUrl: './info-msg.component.html',
	styleUrls: ['./info-msg.component.scss'],
})
export class InfoMsgComponent {
	@Input()
	src: string;

	@Input()
	message: string;
}
