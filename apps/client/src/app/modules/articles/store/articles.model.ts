import { StrapiArticle } from '@csl/types';

export interface ArticlesStateModel {
	articles: StrapiArticle[];
	loading: boolean;
}
