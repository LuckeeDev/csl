import { Injectable } from '@angular/core';
import { StrapiArticle } from '@csl/types';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_ALL_ARTICLES } from './articles.queries';

@Injectable()
export class ArticlesService {
	constructor(private apollo: Apollo) {}

	getAllArticles(): Observable<StrapiArticle[]> {
		return this.apollo
			.query<{ articles: StrapiArticle[] }>({
				query: GET_ALL_ARTICLES,
			})
			.pipe(map(({ data }) => data.articles));
	}
}
