import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CSLDataTableAction,
  CSLDataTableDisplayedColumns,
  CSLDataTableEvent,
  CSLDataTableSource
} from '@csl/shared';

@Component({
  selector: 'csl-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[];

  @Input()
  data: CSLDataTableSource;

  @Input()
  columns: CSLDataTableDisplayedColumns;

  @Input()
  actions: CSLDataTableAction[];

  @Output()
  actionClick = new EventEmitter<CSLDataTableEvent<any>>();

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((column) => column.id);
  }

  emit(value: CSLDataTableEvent) {
    this.actionClick.emit(value);
  }

}
