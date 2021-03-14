import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface Data {
	id: string;
	label: string;
}

@Component({
	selector: 'csl-drag-drop-list',
	templateUrl: './drag-drop-list.component.html',
	styleUrls: ['./drag-drop-list.component.scss'],
})
export class DragDropListComponent {
	@Input()
	data: Data[];

	@Input()
	disableDrag = false;

	@Output()
	dataChange = new EventEmitter();

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.data, event.previousIndex, event.currentIndex);
		this.dataChange.emit(this.data);
	}

	remove(element: Data) {
		const newData = this.data.filter(({ id }) => id !== element.id);
		this.dataChange.emit(newData);
	}
}
