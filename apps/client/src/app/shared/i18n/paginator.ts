import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntlIT extends MatPaginatorIntl {
	itemsPerPageLabel = 'Elementi per pagina';
	nextPageLabel = 'Pagina successiva';
	previousPageLabel = 'Pagina precedente';

	/**
	 * @description Method taken from Stack Overflow
	 * @link [Original SO question](https://stackoverflow.com/questions/46869616/how-to-use-matpaginatorintl)
	 */
	getRangeLabel = function (page: number, pageSize: number, length: number) {
		if (length === 0 || pageSize === 0) {
			return '0 di ' + length;
		}

		length = Math.max(length, 0);
		const startIndex = page * pageSize;

		const endIndex =
			startIndex < length
				? Math.min(startIndex + pageSize, length)
				: startIndex + pageSize;
		return startIndex + 1 + ' - ' + endIndex + ' di ' + length;
	};
}
