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

	private dataSource: MatTableDataSource<CSLDataTableSource[0]>;

	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;

	@Input()
	data: CSLDataTableSource;

	@Input()
	columns: CSLDataTableDisplayedColumns;

	@Input()
	actions: CSLDataTableAction[];

	@Output()
	actionClick = new EventEmitter<CSLDataTableEvent<any>>();

	ngOnInit(): void {
		this.displayedColumns = this.columns.map((column) => column.id);
		this.dataSource = new MatTableDataSource(this.data);
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	emit(value: CSLDataTableEvent) {
		this.actionClick.emit(value);
	}
}
