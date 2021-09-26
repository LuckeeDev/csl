import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StrapiArticle } from '@csl/types';
import { Select, Store } from '@ngxs/store';
import { asyncScheduler, combineLatest, Observable, of, scheduled } from 'rxjs';
import { concatAll, map } from 'rxjs/operators';
import { Articles } from '../../store/articles.actions';
import { ArticlesState } from '../../store/articles.state';

@Component({
	selector: 'csl-articles-home',
	templateUrl: './articles-home.view.html',
	styleUrls: ['./articles-home.view.scss'],
})
export class ArticlesHomeView implements OnInit {
	@Select(ArticlesState.articles)
	articles$: Observable<StrapiArticle[]>;

	search = new FormControl('');

	filteredArticles$: Observable<StrapiArticle[]>;

	constructor(private store: Store) {}

	ngOnInit(): void {
		const search$ = scheduled(
			[of(''), this.search.valueChanges],
			asyncScheduler
		).pipe(concatAll());

		this.filteredArticles$ = combineLatest([
			search$,
			this.articles$,
		]).pipe(
			map(([value, articles]) => {
				if (value) {
					const filterValue = value.toLowerCase();

					return articles.filter((x) =>
						x.title.toLowerCase().includes(filterValue)
					);
				} else {
					return articles.slice();
				}
			})
		);

		this.store.dispatch(new Articles.GetAll());
	}
}
