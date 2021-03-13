import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
	selector: 'csl-drag-drop-list',
	templateUrl: './drag-drop-list.component.html',
	styleUrls: ['./drag-drop-list.component.scss'],
})
export class DragDropListComponent {
	@Input()
	data: unknown[];

	@Output()
	dataChange = new EventEmitter();

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.data, event.previousIndex, event.currentIndex);
		this.dataChange.emit(this.data);
	}
}
