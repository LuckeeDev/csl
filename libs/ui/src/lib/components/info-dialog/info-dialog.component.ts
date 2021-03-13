import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ContentSection {
	header: string;
	paragraph: string;
}

export interface InfoDialogData {
	title: string;
	content: ContentSection[];
	confirm?: string;
	cancel?: string;
}

@Component({
	selector: 'csl-info-dialog',
	templateUrl: './info-dialog.component.html',
	styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: InfoDialogData) {}
}
