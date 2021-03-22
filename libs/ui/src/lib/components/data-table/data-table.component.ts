import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
	CSLDataTableAction,
	CSLDataTableDisplayedColumns,
	CSLDataTableEvent,
	CSLDataTableSource,
} from '@csl/shared';

@Component({
	selector: 'csl-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, AfterViewInit {
	displayedColumns: string[];
	dataSource: MatTableDataSource<CSLDataTableSource[0]>;

	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;

	@Input()
	set data(data: CSLDataTableSource) {
		this.dataSource.data = data;
	}

	@Input()
	columns: CSLDataTableDisplayedColumns;

	@Input()
	actions: CSLDataTableAction[];

	@Output()
	actionClick = new EventEmitter<CSLDataTableEvent<any>>();

	constructor() {
		this.dataSource = new MatTableDataSource([]);
	}

	ngOnInit(): void {
		this.displayedColumns = this.columns.map((column) => column.id);
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	emit(value: CSLDataTableEvent) {
		this.actionClick.emit(value);
	}
}
